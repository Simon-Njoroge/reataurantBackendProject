import { Context } from "hono";
import { restaurantownerservice, getrestaurantownerservice,createowner, updateowner,deleteowner } from './restaurant.service'

export const restaurantownerstate = async (c:Context) =>{
    try{
        const owner = await restaurantownerservice();
        if(owner == null || owner.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(owner,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getrestaurantownerstate = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const address = await getrestaurantownerservice(id);
        if(address == null){
            return c.text("user not found", 404)
        }
        return c.json(address,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}

export const createresowner = async(c:Context)=>{
try{
    const state=await c.req.json();
    const createstate = await createowner(state);
    if(!createstate){
        return c.text("Failed to create user", 400)
    }
    return c.json({msg: createstate},201)
}
catch(err:any){
    return c.json({err: err?.message},400)
}
}
export const updateresowner=async(c:Context)=>{
const id = parseInt(c.req.param("id"));
if(isNaN(id)){
    return c.text("Invalid Id",400)
}
const state= await c.req.json();
try{
    const searchedowner = await  getrestaurantownerservice(id);
    if (searchedowner == undefined){
        return c.text("User not found",404)
    }
    const res= await updateowner(id,state)
    if(!res){
        return c.text("state not updated", 404);
    }
    return c.json({msg:res},201)
}
catch(error:any){
    return c.json({err:error?.message},400)
}
}

export const deleteresowner = async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    try{
        const resowner = await  getrestaurantownerservice(id);
        if (resowner == undefined){
            return c.text("User not found",404)
        }
        const res = await deleteowner(id)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
}