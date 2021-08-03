import React from 'react'

const Change = async (e) => {

    const videoElement = document.getElementById("vida");

    const vidClips = [
        'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/STB_Stuttgart_F%C3%B6hrich_U6_Line_Entering_Station_VIDEO.webm/STB_Stuttgart_F%C3%B6hrich_U6_Line_Entering_Station_VIDEO.webm.160p.webm',
        'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/87/Schlossbergbahn.webm/Schlossbergbahn.webm.160p.webm',
        'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.webm'
    ];
    console.log("videoClips", vidClips);

    // Get video clips as buffers
	const clipsToAppend = await Promise.all(
		vidClips.map(async (vidUrl) => {
			return (await fetch(vidUrl)).arrayBuffer();
		})
	);
    console.log('clips to appended', clipsToAppend)
    // Normal setup, with MediaSource, Object URL, and prepped SourceBuffer
	const mediaSource = new MediaSource();
	videoElement.src = URL.createObjectURL(mediaSource);
	
    // mode = sequence
    const sourceBuffer = await new Promise((resolve, reject) => {
            
        const getSourceBuffer = () => {
            
            try {
                let mimeCodec = 'video/webm; codecs="vp8,vorbis"';
                const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec)
                resolve(sourceBuffer);
            } catch (e) {
                reject(e);
            }
        };

        if (mediaSource.readyState === 'open') {
            getSourceBuffer();
        } else {
            mediaSource.addEventListener('sourceopen', getSourceBuffer);
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
	 
    console.log("sourceBuffer",sourceBuffer)
    console.log("mediaSource", mediaSource)
    console.log("videoElement", videoElement)
}



function Array (){
    return(
        <div>
            <video controls id="vida"/>
            <button onClick={Change}>Change</button>
        </div>
    )
}export default Array