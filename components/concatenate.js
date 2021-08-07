import React from "react";
import Button from "@material-ui/core/Button";

function Concatenate() {
  let urls = [];

  const handleUpload = async (e) => {
    // Handle multiple fileuploads
    let files = e.target.files;
    console.log("files", files);

    // Abort if there were no files selected
    if (!files.length) return;

    // Store promises in array
    for (let file of files) {
      await readFile(file).then((encoded_file) => {
        uploadVideos(encoded_file,file.name);
      });
    }
  };

  function readFile(file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  }

  const uploadVideos = (base64url,name) => {
    console.log("base64_to_POST");
    try {
      fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64url }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        console.log(name,response.status);
        response.json().then((data) => {
          urls.push(data.data);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const Change = async (e) => {
    const videoElement = document.getElementById("vida");
    const vidClips = urls;
    console.log("videoClips", vidClips);

    // Get video clips as buffers
    const clipsToAppend = await Promise.all(
      vidClips.map(async (vidUrl) => {
        return (await fetch(vidUrl)).arrayBuffer();
      })
    );
    console.log("clips to appended", clipsToAppend);

    // Normal setup, with MediaSource, Object URL, and prepped SourceBuffer
    const mediaSource = new MediaSource();
    videoElement.src = URL.createObjectURL(mediaSource);

    // mode = sequence
    const sourceBuffer = await new Promise((resolve, reject) => {
      const getSourceBuffer = () => {
        try {
          let mimeCodec = 'video/webm; codecs="vp8,vorbis"';
          const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
          resolve(sourceBuffer);
        } catch (e) {
          reject(e);
        }
      };

      if (mediaSource.readyState === "open") {
        getSourceBuffer();
      } else {
        mediaSource.addEventListener("sourceopen", getSourceBuffer);
      }
    });

    /**
     * Pointer to last vid appended out of source list
     */
    let clipIndex = 0;
    sourceBuffer.onupdateend = () => {
      if (clipIndex < vidClips.length - 1) {
        clipIndex++;
        sourceBuffer.appendBuffer(clipsToAppend[clipIndex]);
      } else {
        // Done!
        mediaSource.endOfStream();
        videoElement.play();
      }
    };

    // This will kick off event listener chain above
    sourceBuffer.appendBuffer(clipsToAppend[clipIndex]);

    // Debug Info

    console.log("sourceBuffer", sourceBuffer);
    console.log("mediaSource", mediaSource);
    console.log("videoElement", videoElement);
  };
  return (
    <div>
      <video width="300" controls id="vida" />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={Change}>
        Concatenate
      </Button>
      <input type="file" onChange={handleUpload} multiple />
    </div>
  );
}
export default Concatenate;
