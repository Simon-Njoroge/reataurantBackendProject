import "dotenv/config"
import {verify} from "hono/jwt"
import {Context, Next} from 'hono';

export const verifyToken = async (token:string,secret: string) =>{
    try{
        const decoded = await verify(token,secret)
        return decoded 
    }
    catch(error: any){
       return null
        }
}

export const authmiddleware = async (c:Context,next:Next, requiredRole: string)=>{
    const token = c.req.header('Authorization') as string
    if(!token){
        return c.json({message:"Unauthorized"},401)
    }
    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);
    if(!decoded) return c.json({error:"invalid token"},401)
    
        if(decoded.role !== requiredRole) return c.json({error: "unauthorised"},401)
    
            return next();    
}

export const bothauth = async (c:Context,next:Next)=> await authmiddleware(c,next,"[admin,owner]")  
export const adminAuth = async (c:Context,next:Next)=> await authmiddleware(c,next,"admin")  
export const userAuth = async (c:Context,next:Next)=> await authmiddleware(c,next,"owner")
export const driverAuth = async (c:Context,next:Next)=> await authmiddleware(c,next,"driver")  