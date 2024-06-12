import { Context } from "hono";
import {menuitemservice ,getmenuitemservice,createmenuitem,updatemenuitem,deletemenuitem } from './menu.service'

export const menuitemstate = async (c:Context) =>{
    try{
        const menu = await menuitemservice();
        if(menu == null || menu.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(menu,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getmenuitemstate = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const menuitem = await  getmenuitemservice (id);
        if(menuitem == null){
            return c.text("user not found", 404)
        }
        return c.json(menuitem,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}
export const createmenuitems = async(c:Context)=>{
    try{
        const menuitem=await c.req.json();
        const createitem = await createmenuitem(menuitem);
        if(!createitem){
            return c.text("Failed to create user", 400)
        }
        return c.json({msg: createmenuitem},201)
    }
    catch{
        return c.json({err: "Failed to create user"},400)
    }
    }
    export const updatemnuitems=async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    const Mitem= await c.req.json();
    try{
        const searcheditem = await getmenuitemservice(id);
        if (searcheditem == undefined){
            return c.text("User not found",404)
        }
        const res= await updatemenuitem(id,Mitem)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
    }
    
    export const deletemenuitems = async(c:Context)=>{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid Id",400)
        }
        try{
            const Meitem = await  getmenuitemservice(id);
            if (Meitem == undefined){
                return c.text("User not found",404)
            }
            const res = await deletemenuitem(id)
            if(!res){
                return c.text("state not updated", 404);
            }
            return c.json({msg:res},201)
        }
        catch(error:any){
            return c.json({err:error?.message},400)
        }
    }