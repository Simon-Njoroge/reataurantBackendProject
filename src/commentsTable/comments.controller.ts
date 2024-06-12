import { Context } from "hono";
import {commentservice,getcommentservice,createcomment,updatecomment,deletecomment} from './comments.service'

export const commentsservices = async (c:Context) =>{
    try{
        const order = await commentservice();
        if(order == null || order.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(order,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getcommentsservices = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const comment = await getcommentservice(id);
        if(comment == null){
            return c.text("user not found", 404)
        }
        return c.json(comment,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}
export const createcommets= async(c:Context)=>{
    try{
        const comm=await c.req.json();
        const commcre= await createcomment(comm);
        if(!commcre){
            return c.text("Failed to create user", 400)
        }
        return c.json({msg: commcre},201)
    }
    catch(err:any){
        return c.json({err: err?.message},400)
    }
    }
    export const updatecomments=async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    const Ocomm= await c.req.json();
    try{
        const searchedcomm = await getcommentservice(id);
        if (searchedcomm == undefined){
            return c.text("User not found",404)
        }
        const res= await updatecomment(id,Ocomm)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
    }
    


 
export const deletecomments = async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    try{
        const Acomment = await  getcommentservice(id);
        if (Acomment == undefined){
            return c.text("User not found",404)
        }
        const res = await deletecomment(id)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
}