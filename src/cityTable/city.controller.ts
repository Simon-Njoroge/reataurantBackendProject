import { Context } from "hono";
import {cityservice, getcityservice,createcity, updatecity,deletecity} from './city.service'

export const cityservices = async (c:Context) =>{
    try{
        const order = await cityservice();
        if(order == null || order.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(order,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getcityservices = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const city = await getcityservice(id);
        if(city == null){
            return c.text("user not found", 404)
        }
        return c.json(city,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}
export const createcities = async(c:Context)=>{
    try{
        const city=await c.req.json();
        const citycre= await createcity(city);
        if(!citycre){
            return c.text("Failed to create user", 400)
        }
        return c.json({msg: citycre},201)
    }
    catch(err:any){
        return c.json({err: err?.message},400)
    }
    }
    export const updatecities=async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    const Ocity= await c.req.json();
    try{
        const searchedcity = await getcityservice(id);
        if (searchedcity == undefined){
            return c.text("User not found",404)
        }
        const res= await updatecity(id,Ocity)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
    }
    


 
export const deletecities = async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    try{
        const Acity = await  getcityservice(id);
        if (Acity == undefined){
            return c.text("User not found",404)
        }
        const res = await deletecity(id)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
}