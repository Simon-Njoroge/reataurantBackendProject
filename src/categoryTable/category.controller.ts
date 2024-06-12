import { Context } from "hono";
import {categortyservice,getctgoryservice,createcategory,updatecategory,deletecategory} from './category.service'

export const categoryservices = async (c:Context) =>{
    try{
        const cate = await categortyservice();
        if(cate == null || cate.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(cate,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getcategoryservices = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const categoryy = await getctgoryservice(id);
        if(categoryy == null){
            return c.text("user not found", 404)
        }
        return c.json(categoryy,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}
export const createcategories = async(c:Context)=>{
    try{
        const kategory=await c.req.json();
        const kategories= await createcategory(kategory);
        if(!kategories){
            return c.text("Failed to create user", 400)
        }
        return c.json({msg: kategories},201)
    }
    catch(err:any){
        return c.json({err: err?.message},400)
    }
    }
    export const updatecategories=async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    const Ocategory= await c.req.json();
    try{
        const searchedcategory = await getctgoryservice(id);
        if (searchedcategory == undefined){
            return c.text("User not found",404)
        }
        const res= await updatecategory(id,Ocategory)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
    }
    


 
export const deletecategories = async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    try{
        const Acategory = await  getctgoryservice(id);
        if (Acategory == undefined){
            return c.text("User not found",404)
        }
        const res = await deletecategory(id)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
}