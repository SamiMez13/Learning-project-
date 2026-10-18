import multer, { Multer } from "multer";
import { AppError } from "../errors/AppError";

const   MAX_FILE_SIZE_MB= 10*1024*1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp"]; 


export const uploadBannerImg = multer({
    storage  : multer.memoryStorage(),
    limits : {
        fieldSize : MAX_FILE_SIZE_MB
    },
    fileFilter : (req,file,callback)=>{
        if(allowedTypes.includes(file.mimetype)){
            callback(null,true);
        } else {
            callback(new AppError(400, "only image file are allowed . "))
        }
    }
})


export const uploadSingleBannerImage = uploadBannerImg.single("image");