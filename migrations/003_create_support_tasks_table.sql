 

CREATE TABLE support_tasks(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    title varchar(255) NOT NULL,
    
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN'
        CHECK (status in ('OPEN', 'IN_PROGRESS','RESOLVED')),

    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    created_at TIMESTAMP NOT NULL DEFAULT now(),

    updated_at TIMESTAMP NOT NULL DEFAULT now()


)