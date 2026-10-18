

import {Router} from 'express'
import { requireAdmin } from '../middlewares/admin.middleware';
import { authenticate } from '../middlewares/auth.middleware';
import { uploadSingleBannerImage } from '../middlewares/banner.middleware';
import { createAdminBannerService, deleteAdminBannerService, fetchAdminBanners } from '../services/admin.banner.service';


export const adminBannerRouter = Router();

adminBannerRouter.use(authenticate, requireAdmin)

adminBannerRouter.post("/" , uploadSingleBannerImage, async(req, res , next)=>{

    try{
        const banner =  await createAdminBannerService(req.file) ; 

        res.status(201).json({
            success : true , 
            data  : {banner},
        });

    } catch(err){
        next(err);  
    }


})


adminBannerRouter.get('/' ,async(req, res , next)=>{
    try {

        const  banners = await fetchAdminBanners();

        res.status(200).json({
            success : true,
            data : {banners}
        })

    }catch(err) {
        next(err);
    }

} )


adminBannerRouter.delete("/:bannerId" , async(req , res , next)=> {
    try{
        await deleteAdminBannerService(req.params.bannerId)

        res.status(204 ).json({
            success : true,
            message : "banner deleted successfully"
        });
    }catch(err ){
        next(err);
    } 
})