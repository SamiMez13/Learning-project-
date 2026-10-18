import {v2 as cloudinary} from 'cloudinary';
import { env } from "../config/env";    
import { AppError } from '../errors/AppError';



type uploadResult = {
    secureUrl : string;
    publicId : string ;
}

export async function uploadBannerImageToCloudinary(
    buffer : Buffer,
    options : {folder? : string}
):Promise<uploadResult>{

    const cloudName=  process.env.CLOUDINARY_CLOUD_NAME ;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_SECRET_KEY;

    if(!cloudName ||!apiKey || !apiSecret){
        throw new AppError(500 ,"cloudinary is not configured properly ");
    }

    //configure cloudinay ;
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });


    return new Promise((resolve, reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder : options.folder,
                resource_type : "image"
            },
            (error , result)=>{
                if(error ){
                    reject(error);
                    return 
                }
                
                resolve({
                    secureUrl: result?.secure_url ?? "",
                    publicId: result?.public_id ?? ""
                })
            }
        )
        // sending  raw image  bytes to cloudinary 
        uploadStream.end(buffer);
    })
    
    
}


export async function deleteBannerImageFromCloudinary(
    public_id : string
):Promise<void>{
    const cloudName=  process.env.CLOUDINARY_CLOUD_NAME ;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_SECRET_KEY;

    if(!cloudName ||!apiKey || !apiSecret){
        throw new AppError(500 ,"cloudinary is not configured properly ");
    }

    //configure cloudinay ;
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });


    return cloudinary.uploader.destroy(public_id);

}
