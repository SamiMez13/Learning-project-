import { pool } from "../lib/db";
import { Banner } from "../types/banner";


type BannerRow = Banner ; 


export async function createAdminBanner(
    imageUrl : string , 
    cloudinaryPublicId : string,
):Promise<Banner>{
    const  result = await pool.query<BannerRow>(
        `
        INSERT INTO banners(image_url, cloudinary_public_id)
        VALUES ($1, $2) 
        RETURNING *;
        `,[imageUrl,cloudinaryPublicId]
    );
    return result.rows[0]; 
    
}


export async function findAllAdminBannersFromDB( ):Promise<Banner[]>{
    const  result = await pool.query<BannerRow>(`
        SELECT 
        * 
        FROM banners
        ORDER BY created_at DESC;
    `);
    return result.rows;
}


export async function  deleteAdminBannerById(id : string ):Promise<string | null> {
    const result = await pool.query<{cloudinary_public_id  : string}> (
        `
        DELETE FROM banners
        WHERE id = $1
        RETURNING cloudinary_public_id ;
        ` , [id]
    )

    return result.rows[0]?.cloudinary_public_id ;
}