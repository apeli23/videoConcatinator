function Test (){
    const Change = async (e) => {
        const vidClips = ['https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/STB_Stuttgart_F%C3%B6hrich_U6_Line_Entering_Station_VIDEO.webm/STB_Stuttgart_F%C3%B6hrich_U6_Line_Entering_Station_VIDEO.webm.160p.webm',
		'https://res.cloudinary.com/dogjmmett/video/upload/v1628418573/q5b0hbo4uau3mdinped9.webm']
       
        console.log("videoClips", vidClips);

        // Get video clips as buffers
        const arrayBuffers = await Promise.all(
            vidClips.map(async (vidUrl) => {
                return (await fetch(vidUrl)).arrayBuffer();
            })
        );
        console.log('arrayBuffers', arrayBuffers)

       
        //Refference to video element
        const videoElement = document.getElementById("vida");

         // Normal setup, with MediaSource Object URL, and prepped SourceBuffer
        
         let mimeCodec = 'video/webm; codecs="vp8,vorbis"';
        if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
            const mediaSource = new MediaSource();
            console.log(mediaSource.readyState); // closed
            videoElement.src = URL.createObjectURL(mediaSource);
            mediaSource.addEventListener('sourceopen', sourceOpen);
        }else {
            console.error('Unsupported MIME type or codec: ', mimeCodec);
        }

        function sourceOpen (_) {
            var mediaSource = this;
            var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
            console.log(this.readyState); // open
            // SourceBuffer(mimeCodec);
         
        
        }
       
         


 
    }
    return(
        <div>
            <video width="300" controls id="vida" />
            {/* <input type="file" onChange={handleUpload} multiple /> */}
            <button onClick={Change}>vidClips</button>
        </div>
    )
}export default Test;