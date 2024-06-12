import { Context } from "hono";
import {createownerauthservice,ownerloginservice} from './auth.service'
import bcrypt from 'bcrypt'
import "dotenv/config" 
import{sign} from "hono/jwt"
export const registerowner = async(c:Context)=>{
    try{
        const owner=await c.req.json();
        const pass =owner.password;
        const hashedPassword = await bcrypt.hash(pass,10);
        owner.password = hashedPassword
        const createowner= await createownerauthservice(owner);
        if(!createowner){
            return c.text("Failed to create user", 400)
        }

        return c.json({msg: createowner},201)
    }
    catch(err:any){
        return c.json({err: err?.message},400)
}}
export const loginowner = async(c:Context)=>{
    try{
        const owner=await c.req.json();
        const ownerlogin = await ownerloginservice(owner);
        const ownermatch= await bcrypt.compare(owner.password as string , ownerlogin?.password as string)
        if(!ownermatch){
            return c.text("Invalid credentials", 401)
        }else{ 
        let payload ={
            ownername: ownerlogin?.ownername,
            role: ownerlogin?.role,
            ownerid: ownerlogin?.owner?.restaurant_id,
            exp: Math.floor(Date.now() / 1000 +(60*180))   
        }
        let secret = process.env.JWT_SECRET as string;
        const token = await sign(payload,secret)
        let password = ownerlogin?.password;
        let owner = ownerlogin?.owner;
        let role =ownerlogin?.role;
        let passsword = ownerlogin?.password;

        return c.json({token,owner:{role,owner ,passsword}},200)
    } 
        return c.json({owner:ownerlogin, match: ownermatch},200)
        console.log(ownerlogin)
    }
    catch (err: any){
        return c.json({err: err?.message},400)
    }
}