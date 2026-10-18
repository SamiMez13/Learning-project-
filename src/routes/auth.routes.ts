import {Router} from 'express';
import { loginUser, loginWithGoogle, registerUser, startGoogleLogin } from '../services/auth.service';
import { authenticate } from '../middlewares/auth.middleware';

export const authRouter = Router();

authRouter.post('/register', async (req , res, next ) => {
    try{
        const { email, password } = req.body || {};
        // we will not write service logi here  we will implement it in services 
        await  registerUser(email , password)
        
        res.status(201).json({
            success : true ,
            message : "user created successfully please login to continue"
        })
    
    }catch(error){
        next(error);
    }
});

authRouter.post("/login",async (req , res, next)=>{
    try {
        const {email,password} = req.body;

        const {accessToken} = await loginUser(email,password);

        res.status(200).json({
            success : true ,
            message : "user loged in successfully",
            data : {
                accessToken,
            }
        })
    }catch (err) {
        next(err);
    }
})

authRouter.get("/me" , authenticate, (req, res)=>{
    res.status(200).json({
        success : true  , 
        data  : {
            user :  req.user
        },
    })
})

authRouter.get("/google", (_req, res)=> {
    const googleAuthUrl = startGoogleLogin();
    res.redirect(googleAuthUrl);   
})

authRouter.get("/google/callback" , async(req, res ,next )=>{
    
    try{
        const code = req.query.code as string | undefined;

        const {accessToken} = await loginWithGoogle(code ??"")
        res.status(200).json ({
            success  : true , 
            data  : {accessToken}
        })

    } catch(error) {
        next(error);
    }


});


