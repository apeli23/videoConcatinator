import React from 'react'
 

function Concatenator() {
   
    
    const  Change = async (e) => {
        const file = e.target.files;
        console.log("uploaded file",file)
        
        const link = new FileReader();
        let blob = new Blob( e.target.files, {type: "video.mp4" });
        console.log("blob",blob)
        // convert the image  to  url and pass it
        link.readAsDataURL(blob);
        console.log("link",link)
        link.onloadend = () => {
                uploadVideo(link.result)
            };

    }
     
    const uploadVideo = async (base64EncodedVideo) => {
        console.log("base64EncodedVideo",base64EncodedVideo)
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data:base64EncodedVideo }),
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
          console.error(error);
        }
    }

    return(
        <div>
            <video controls></video>
            <input type="file" onChange={Change}/>
        </div>
    )
}export default Concatenator;