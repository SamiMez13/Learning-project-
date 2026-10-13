CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    email varchar(255) NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    google_id  varchar(255) UNIQUE,

    role varchar(20) NOT NULL  DEFAULT 'USER'
        CHECK ( role in ('USER', 'ADMIN')),

    created_at timestamp NOT NULL DEFAULT now(),
    
    updated_at timestamp NOT NULL DEFAULT now()   

     
    
    

)