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
      console.log("works")
      try {
        let Files = req.body.data;

        console.log("to_upload", Files)
        let multipleFilePromise =  Files.map((file) =>
        await cloudinary.uploader.upload_large(file.path,{
            chunk_size: 6000000,
        })
    );
      } catch (error) {
          
      }
    }
}