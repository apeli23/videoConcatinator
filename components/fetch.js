import React from 'react'

function Fetch () {

      
    const  Change = async (event) => {
        // const files = event.target.files;
        // console.log("selected file", files)
        // const filesArray = [event.target.files]
        // let array=   filesArray.map((file) =>
        //     console.log("file_array",file)
        // );
        // const arrays = [event.target.files[0],event.target.files[1]]
        // console.log("array",arrays)

        for(let i=0; i<event.target.files.length;i++) {
            console.log("uploaded files", event.target.files[i])
        }

    //     let blob = new Blob( event.target.files, {type: "video/webm" });
    //     let url = URL.createObjectURL(blob)
    //     console.log("url", url)

    //     const reader = new FileReader();
    //     reader.readAsDataURL(blob)
    //     reader.onloadend = () => {
    //         uploadVideo(reader.result);
    //     };
         
 
    // }
    // const uploadVideo = async ( url) => {
    //     console.log("url", url)

            // try {
            //     await fetch('/api/upload', {
            //         method: 'POST',
            //         body: JSON.stringify({ data:url }),
                    
            //         headers: { 'Content-Type': 'application/json' },
            //     });
            // } catch (error) {
            //   console.error(error);
            // }
    }
    return(
        <div>
            <input type="file"
             onChange= {Change} 
            multiple/>
        </div>
    )
}export default Fetch