import { Context } from "hono";
import {ordermenuservice,getordermenuservice,createordermenu,updateordermenu,deleteordermenu } from './menuitem.service'

export const ordermenustate = async (c:Context) =>{
    try{
        const order = await ordermenuservice();
        if(order == null || order.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(order,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getordermenustate = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const address = await getordermenuservice (id);
        if(address == null){
            return c.text("user not found", 404)
        }
        return c.json(address,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}
export const createordermenut = async(c:Context)=>{
    try{
        const menu=await c.req.json();
        const createmenu = await createordermenu(menu);
        if(!createmenu){
            return c.text("Failed to create user", 400)
        }
        return c.json({msg: createordermenu},201)
    }
    catch{
        return c.json({err: "Failed to create user"},400)
    }
    }
    export const updateordermenut=async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    const omenu= await c.req.json();
    try{
        const searchedowner = await getordermenuservice(id);
        if (searchedowner == undefined){
            return c.text("User not found",404)
        }
        const res= await updateordermenu(id,omenu)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
    }
    
    export const deleteordermenut = async(c:Context)=>{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid Id",400)
        }
        try{
            const Ormenu = await  getordermenuservice(id);
            if (Ormenu == undefined){
                return c.text("User not found",404)
            }
            const res = await deleteordermenu(id)
            if(!res){
                return c.text("state not updated", 404);
            }
            return c.json({msg:res},201)
        }
        catch(error:any){
            return c.json({err:error?.message},400)
        }
    }