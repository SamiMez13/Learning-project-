import { AppError } from "../errors/AppError";
import { PASSWORD_LENGTH } from "../constants/auth";
import { findUserByEmail, createUser, findUserByEmailWithPassword } from "../repositories/user.repository";
import bcrypt from 'bcrypt';
import { signAccessToken } from "../lib/jwt";




export async function registerUser(email: string, password: string): Promise<void> {
    if (!email || !password) {
        throw new AppError(400, "Email and password are  required");
    }

    if (password.length < PASSWORD_LENGTH) {
        throw new AppError(400, `Password must be at least ${PASSWORD_LENGTH} characters long`);
    }

    const normalizeEmail = email.toLowerCase().trim()


    const existingUser = await findUserByEmail(normalizeEmail);

    if (existingUser) {
        throw new AppError(409, "email already exists")
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    await createUser(normalizeEmail, passwordHashed);





}

export async function loginUser(
    email:string,
     password:string): Promise<{accessToken:string}>{
        if (!email || !password ) {
            throw new AppError(400,"Email and password are required");
        }

        const normalizeEmail=  email.toLowerCase().trim();

        const user= await findUserByEmailWithPassword(normalizeEmail  );
        

        if (!user?.password_hash){
            throw new AppError(401,"Invalid email or password" );
        }

        const isPasswordValid = await bcrypt.compare(password , user.password_hash);
        
        if (!isPasswordValid) {
            throw new AppError(401,"Invalid email or password" );
        }

        const accessToken = signAccessToken({
            userId : user.id , 
            email : normalizeEmail,
            role : user.role,
        })
        
        return { accessToken };
     }


