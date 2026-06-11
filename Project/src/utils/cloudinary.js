import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

clodinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        })

        //file has successfull uploaded on cloudinary
        console.log("file is uploaded on cloudinary" , response.url);
        
        return response;

    }catch(error){  
        // file server pr to hai pr koi problem ki vajase nahi aayi hai so maybe virus or malerius or corrupted file ko remove(unlink) krna padega
        fs.unlink(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null

    }
}

const uploadOnCloudinary = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'main-sample',
           }
       )
       .catch((error) => {
           console.log(error);
});