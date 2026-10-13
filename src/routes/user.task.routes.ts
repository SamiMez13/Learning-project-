import {Router} from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { createUserTask, getUserTaskById, getUserTasks } from '../services/user.task.service';
import { requireAdmin } from '../middlewares/admin.middleware';

export const userTaskRouter = Router();

userTaskRouter.use(authenticate)

userTaskRouter.post("/", async(req, res, next) =>{
    try{
        const task = await createUserTask(req.user!.userId , req.body.title)
        
        return res.status(200).json({
            success : true  , 
            data : {
                task
            }
        })

    }catch(error) {
        next(error)
    }
})

userTaskRouter.get("/",async( req , res  ,next )=>{
    try {
        const tasks = await getUserTasks(req.user!.userId)
        return res.status(200).json({
            success : true  , 
            data : {
                tasks
            }
        })

    }catch(error) {
        next(error)
    }
})

userTaskRouter.get("/:taskId",async( req , res  ,next )=>{
    try {
        const task = await getUserTaskById(req.params.taskId,req.user!.userId)

        res.status(200).json({
            success : true ,
            data : {
                task
            }
        })

    }catch(error){
        next(error)
    }
})

