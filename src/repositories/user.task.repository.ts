import { pool } from "../lib/db";
import { Task } from "../types/task";


type TaskRow = Task 




export async function createTask(
    userId : string , 
    title : string): Promise<TaskRow> {
        const result = await pool.query(
            `
            insert into support_tasks(userId , title) values ($1 , $2) Returning *;
            `,
            [userId,title]
        );

        return result.rows[0];
    }


export async function fetchTaskByUserId(userId : string) :Promise<TaskRow[]>{
    const result = await pool.query(
        `SELECT support_tasks.* FROM support_tasks 
        where support_tasks.userId = $1
        ORDER BY created_at DESC ;
        `,
        [userId]
    );

    return result.rows;
}

export async function findTaskByIdAndUserID(taskId: string , userId : string):Promise<Task | null>{
    const result = await pool.query(`
        SELECT id , title , status , user_id, created_at, updated_at 
        from support_tasks where id = $1 and user_id = $2;
        `,[taskId, userId]);
        
        if (result.rows.length ===0 ) {
            return null 
        }

        return result.rows[0];
}