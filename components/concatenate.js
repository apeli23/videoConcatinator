import React, { useRef, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({ log: true });

function Concatenate() {

  // handle state for loading ffmpeg
  const [ready, setReady] = useState(false);

  // load ffmpeg only when required by component
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  };

  // Load each time component is loaded
  useEffect(() => {
    load();
  }, []);

  const videoplayer = useRef();
  let url = "";

  const handleUpload = async (e) => {
    // Handle multiple fileuploads
    let files = e.target.files;
    console.log("files", files);

    // Abort if there were no files selected
    if (!files.length) return;
    // Store promises in array
    let concat_list = "file ";
    for (let file of files) {
      ffmpeg.FS("writeFile", file.name, await fetchFile(file));
      concat_list += file.name + "\nfile ";
    }
    // FIXME: Possible error inside concate list
    ffmpeg.FS("writeFile", "concat_list.txt", concat_list);
    await ffmpeg.run(
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      "concat_list.txt",
      "combined.mp4"
    );

    const { combinedata } = ffmpeg.FS("readFile", "combined.mp4");
    readFile(new Blob([combinedata.buffer], { type: "video/mp4" })).then(
      (encoded_file) => {
        console.log(encoded_file);
        uploadVideos(encoded_file, "combined.mp4");
      }
    );
  };

  function readFile(blob) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(blob);
    });
  }

  const uploadVideos = (base64url, name) => {
    console.log("base64_to_POST");
    try {
      fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64url }),
        headers: { "Content-Type": "application/json" }
      }).then((response) => {
        console.log(name, response.status);
        response.json().then((data) => {
          console.log(data.data);
          url = data.data;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Play = async (e) => {
    videoplayer.current.src = url;
  };

  
  return (
    <div>
      <video width="300" controls ref={videoplayer} />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={Play}>
        Play combined
      </Button>
      <input type="file" onChange={handleUpload} multiple />
    </div>
  );
}
export default Concatenate;
