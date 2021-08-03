import React, { useState ,createRef} from 'react'
import { Base64 } from 'js-base64';


function Concatenator() {
    const [videos, setVideos] = useState()
    const [selectedGif, setSelectedGif] = useState();
    const [previewSource, setPreviewSource] = useState('');
    
    const  Change = async (e) => {
        const file = e.target.files[0];
        console.log("uploaded file",file)
        
        const link = new FileReader();
        // convert the image  to  url and pass it
        link.readAsDataURL(file);
        link.onloadend = () => {
                uploadVideo(link.result)
            };

    }
    const  Change2 = async (e) => {
        const file = e.target.files;
        console.log("uploaded file",file)
        
        
 
    }

     
    const uploadVideo = async (base64EncodedImage) => {
        console.log("base64EncodedImage",base64EncodedImage)
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
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