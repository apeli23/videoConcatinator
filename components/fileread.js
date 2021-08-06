function FileRead(){
    
    const handleUpload = async (e) => {
        
        function readAsDataURL(file){
            return new Promise(function(resolve,reject){
                let fr = new FileReader();
    
                fr.onload = function(){
                    resolve(fr.result);
                };
    
                fr.onerror = function(){
                    reject(fr);
                };
    
                fr.readAsDataURL(file);
            });
        }
        // Handle multiple fileuploads
        let files = e.target.files;
        console.log("files", files)
       
        let readers = [];

        // Abort if there were no files selected
        if(!files.length) return;
        
        // Store promises in array
        for(let i = 0;i < files.length;i++){
            console.log("for_counter", files[i])
            readers.push(readAsDataURL(files[i]));
        }
        // Trigger Promises
        Promise.all(readers).then((values) => {
            // Values will be an array that contains an item
            // with the text of every selected file
            // ["File1 Content", "File2 Content" ... "FileN Content"]
            console.log("base64_array",values);
            uploadVideos(values)
        });
        const uploadVideos = async (base64url) => {
            console.log("base64_to_POST", base64url)
            try {
                await fetch('/api/upload', {
                    method: 'POST',
                    body: JSON.stringify({ data:base64url}),
                    headers: { 'Content-Type': 'application/json' },
                })
                // .then(console.log(res));
            } catch (error) {
              console.error(error);
            }
        }

    }
    
    return(
        <div>
            <input type="file" 
            onChange= {handleUpload} 
            multiple/>
        </div>
    )
}export default FileRead