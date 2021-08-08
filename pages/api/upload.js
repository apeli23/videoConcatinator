var cloudinary = require('cloudinary').v2
var createArray = require('create-array');

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
  var link=[];
    if (req.method === 'POST') {
    // Process a POST request
      console.log("api works start here")
      let uploaded_url = ""
      try {
        let fileStr = req.body.data;
        console.log("backend received")
         
        const uploadedResponse = await cloudinary.uploader.upload_large(
          fileStr,
          {
            resource_type: "video",
            chunk_size: 6000000,
          }
        );
        uploaded_url = uploadedResponse.secure_url
        console.log("uploaded_url",uploaded_url)

      } catch (error) {
        res.status(500).json(error,'Something wrong')
      }
      res.status(200).json({data:uploaded_url})
    }
}