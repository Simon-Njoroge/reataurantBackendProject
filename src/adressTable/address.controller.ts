import { Context } from "hono";
import {addressservice,getaddressservice,createaddress,updateaddress,deleteaddress  } from './address.service'


export const addressservices = async (c:Context) =>{
    try{
        const cate = await addressservice();
        if(cate == null || cate.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(cate,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getaddressservices = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const addresses = await getaddressservice(id);
        if(addresses == null){
            return c.text("user not found", 404)
        }
        return c.json(addresses,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}
export const createddresses = async(c:Context)=>{
    try{
        const addr=await c.req.json();
        const aDDR= await createaddress(addr);
        if(!aDDR){
            return c.text("Failed to create user", 400)
        }
        return c.json({msg: aDDR},201)
    }
    catch(err:any){
        return c.json({err: err?.message},400)
    }
    }
    export const updateaddresses=async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    const Oaddress= await c.req.json();
    try{
        const searchedaddress = await getaddressservice(id);
        if (searchedaddress == undefined){
            return c.text("User not found",404)
        }
        const res= await updateaddress(id,Oaddress)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
    }
    


 
export const deleteaddresses = async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    try{
        const Aaddress = await  getaddressservice(id);
        if (Aaddress == undefined){
            return c.text("User not found",404)
        }
        const res = await deleteaddress(id)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
}