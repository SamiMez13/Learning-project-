export type Task = {
    id : string;
    title : string ; 
    status: string ; 
    user_id : string  ;
    created_at : Date ;
    updated_at : Date 
}

export type TaskStatus = "pending" | "completed" | "in_progress" 