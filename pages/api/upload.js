var cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
});
export const config = {
    api: {
      bodyParser: {
        sizeLimit: '20mb',
      },
    },
  }
export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
      console.log("api works start here")
        try {
    //         const sample = "https://res.cloudinary.com/dogjmmett/video/upload/v1628032985/videoplayback_nzlzbv.mp4"
            const fileStr = req.body.data
            console.log("body.data",fileStr)
            const uploadedResponse = await cloudinary.uploader.
                upload_large(fileStr,{
                resource_type: "video",
                chunk_size: 6000000,
                // upload_preset: "video_concatenator"
                })
                console.log(uploadedResponse)
                res.json({msg: "YEAH!!!"})
            } 
        catch (error) {
            console.log("error",error)
          res.status(500).json(error,'Something wrong')
      }
    }
}