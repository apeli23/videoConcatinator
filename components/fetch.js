import React from 'react'

function Fetch () {

      
    const  Change = async (event) => {
        const file = event.target.files;
        console.log("uploaded file", file)
        
        let blob = new Blob( event.target.files, {type: "video/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            uploadImage(reader.result);
        };

        const uploadImage = async ( base64EncodedImage) => {
            console.log(base64EncodedImage)

            try {
                await fetch('/api/upload', {
                    method: 'POST',
                    body: JSON.stringify({ data:base64EncodedImage }),
                    sizeLimit: '20mb',
                    headers: { 'Content-Type': 'application/json' },
                });
            } catch (error) {
              console.error(error);
            }
        }
        

    }
    return(
        <div>
            <input type="file"
             onChange= {Change} 
            multiple/>
        </div>
    )
}export default Fetch