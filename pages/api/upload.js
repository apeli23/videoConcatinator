const {cloudinary} = require('./utils/cloudinary')


export default async  function handler (req, res) {
    if (req.method === 'POST') {
        // console.log('server works')
      // Process a POST request
      try {
          const fileStr = req.body.data
        //   console.log(fileStr)
            const uploadedResponse = await cloudinary.uploader.
            upload(fileStr,{
                upload_preset: 'video_concatinator'
            })
            console.log(uploadedResponse)
            res.json({msg: "YEAH!!!"})
      } catch (error) {
          console.log(error)
          res.status(500).json(error,'Something wrong')
      }
    } else {
      // Handle any other HTTP method
    }
  }