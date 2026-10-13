import { AppError } from "../errors/AppError";
import { createUser } from "../repositories/user.repository";
import { createTask, fetchTaskByUserId, findTaskByIdAndUserID } from "../repositories/user.task.repository";
import { Task } from "../types/task";


function validateTitle(title : unknown ){
    
    
    if (typeof title !== 'string' || !title.trim() ) {
        throw new AppError(400 , "Title is required");
    }
    const timmedTitle = title.trim();

    if ( timmedTitle.length > 100) {
        throw new AppError(400, "Title cannot be longer than 100 characters");
    }
    return timmedTitle;
}



export async function createUserTask( 
    userId : string,
    title : unknown
    ):Promise<Task> {
   
    const validTitle = validateTitle(title);

    return createTask(userId, validTitle); 
}

export async function getUserTasks(userId:string ):Promise<Task[]> {
    return fetchTaskByUserId(userId);
}

export async function getUserTaskById(userId : string ,taskId : string):Promise<Task> {
    const task = await findTaskByIdAndUserID(taskId, userId);

    if (!task) {
        throw new AppError(404, "task not found")
    }

    return task;
}