import { AppError } from "../errors/AppError";
import { clearBannersCache, getBannersFromCache, setBannerCache } from "../lib/bannerCache";
import {  uploadBannerImageToCloudinary } from "../lib/cloudinary";
import { addDeleteCloudinaryImageJob } from "../queues/DeleteCloudinaryImage.queue.";
import { createAdminBanner, deleteAdminBannerById, findAllAdminBannersFromDB } from "../repositories/admin.banner.repository";
import { Banner } from "../types/banner";


export async function createAdminBannerService(
    file : Express.Multer.File | undefined
):Promise<Banner>{

    if (!file ) {
        throw new AppError(400 , "image is required")
    }
    
    if (!file.buffer){
        throw new AppError(400 , "image type  is invalid ")
    }

    const {secureUrl, publicId}  = await uploadBannerImageToCloudinary(file.buffer , {
        folder : "nodejs-capstone-project"
    });

    if (!secureUrl || !publicId){
        throw new AppError(500 , "failed to upload image ");
    }

    const banner  = await  createAdminBanner(secureUrl , publicId);

    await clearBannersCache();
    

    return banner;
}


export async function fetchAdminBanners() :Promise<Banner[]>{


    const getCachedBanners = await getBannersFromCache()  ; 
    if (getCachedBanners) {
         
        return getCachedBanners;
    } 

    const banners  = await findAllAdminBannersFromDB();

    await setBannerCache(banners) ; 

    return banners;
}

export async function deleteAdminBannerService(bannerId : string):Promise<void> {
    // delete from db and get the public id 
    const publicId = await deleteAdminBannerById(bannerId) ;
    
    if (!publicId) {
        throw new AppError(404,  "Banner not found")
    }

    await clearBannersCache() ;

    // add bullmq job
    await addDeleteCloudinaryImageJob(publicId);
}
