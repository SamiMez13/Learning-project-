
CREATE TABLE banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    image_url TEXT NOT NULL,

    cloudinary_primary_id TEXT NOT NULL,

    cloudinary_secondary_id TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT now(),

    updated_at TIMESTAMP NOT NULL DEFAULT now()

    

)