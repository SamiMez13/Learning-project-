import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";
import { getAdminTasks, updateAdminTaskStatus } from "../services/admin.task.service";

export const adminTaskRouter = Router();

adminTaskRouter.use(authenticate)

adminTaskRouter.use(requireAdmin)

adminTaskRouter.get("/", async(req , res , next) =>{
    try{
        const data = getAdminTasks(req.query)

        res.status(200).json({
            success : true ,
            data
        })

    }catch(error) {
        next(error)
    }
})

adminTaskRouter.patch("/:taskId/status", async (req , res , next) => {
    try {
        const task = await updateAdminTaskStatus(
            req.params.taskId,
            req.body.status
        )

        res.status(200).json({
            success : true,
            task
        })


    } catch (error) {
        next(error)
    }
})