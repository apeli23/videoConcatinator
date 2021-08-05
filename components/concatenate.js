import React from 'react'
import Button from '@material-ui/core/Button';
import { Base64 } from 'js-base64';

function Concatenate () {

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        console.log("uploaded file", file)
        
        let blob = new Blob( e.target.files, {type: "video/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            uploadVideo(reader.result);
        };
    }
    const uploadVideo = async (base64EncodedImage) => {
        console.log("bae64_to_post", base64EncodedImage)
        // try {
        //     await fetch('/api/upload', {
        //         method: 'POST',
        //         body: JSON.stringify({ data:base64EncodedImage }),
        //         headers: { 'Content-Type': 'application/json' },
        //     });
        // } catch (error) {
        //   console.error(error);
        // }
    }

    const Change = async (e) => {
        const videoElement = document.getElementById("vida");
        const vidClips = [
            'https://res.cloudinary.com/dogjmmett/video/upload/v1628064580/STB_Stuttgart_F%C3%B6hrich_U6_Line_Entering_Station_VIDEO.webm.160p_kfpkgc.webm',
            'https://demo-res.cloudinary.com/video/upload/w_500/dog.webm',
            'https://res.cloudinary.com/dogjmmett/video/upload/v1628064576/rabbit320_hyftw3.webm'
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
    return(
        <div>
            <video width="300"  controls id="vida" /><br/><br/>
            <Button variant="contained" color ="primary" onClick={Change}>Concatenate</Button>
            <input type="file" onChange= {handleInput} multiple/>
        </div>
    )
}export default Concatenate