import { Context } from "hono";
  import {userservice, getuserservice,createuser,updateuser,deleteuser, getuserfull} from './users.service'

export const usersservices = async (c:Context) =>{
    try{
        const use = await userservice();
        if(use == null || use.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(use,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getuserservices = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const used = await getuserservice(id);
        if(used == null){
            return c.text("user not found", 404)
        }
        return c.json(used,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}

export const createusers = async(c:Context)=>{
try{
    const user=await c.req.json();
    const createus = await createuser(user);
    if(!createus){
        return c.text("Failed to create user", 400)
    }
    return c.json({msg: createus},201)
}
catch(err:any){
    return c.json({err: err?.message},400)
}
}
export const updateusers=async(c:Context)=>{
const id = parseInt(c.req.param("id"));
if(isNaN(id)){
    return c.text("Invalid Id",400)
}
const state= await c.req.json();
try{
    const searchedusers = await  getuserservice(id);
    if (searchedusers == undefined){
        return c.text("User not found",404)
    }
    const res= await updateuser(id,state)
    if(!res){
        return c.text("state not updated", 404);
    }
    return c.json({msg:res},201)
}
catch(error:any){
    return c.json({err:error?.message},400)
}
}

export const deleteusers = async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    try{
        const resowner = await getuserservice(id);
        if (resowner == undefined){
            return c.text("User not found",404)
        }
        const res = await deleteuser(id)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
}

export const getuserfulls = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const fulluserdetails = await getuserfull(id);
        if(fulluserdetails == null){
            return c.text("user not found", 404)
        }
        return c.json(fulluserdetails,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}