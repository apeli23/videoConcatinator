function Loop() {
    const  Change = async (event) => {
        for(let i=0; i<event.target.files.length;i++) {
            // console.log("uploaded files", event.target.files[i])
            let blob = new Blob( event.target.files, {type: "video/webm" });
            // let url = URL.createObjectURL(blob)
            console.log("blob", blob)

            const reader = new FileReader();
                reader.readAsDataURL(blob)
                reader.onloadend = () => {
                    console.log("data url",reader.result);
                };
                uploadVideo(reader.result);
        }
    }
    
    const uploadVideo = async ( url) => {
        console.log("url", url)
        try {
                await fetch('/api/test ', {
                    method: 'POST',
                    body: JSON.stringify({ data:url }),
                    
                    headers: { 'Content-Type': 'application/json' },
                });
            } catch (error) {
              console.error(error);
            }
    }
    return(
        <div>
        <input type="file"
        onChange= {Change} 
        multiple/>
    </div>
    )
}export default Loop