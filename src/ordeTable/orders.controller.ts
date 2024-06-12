import { Context } from "hono";
import { orderstableservice, getorderstableservice, createorder ,updateorder ,deleteorder} from './order.service'

export const orderstablestate = async (c:Context) =>{
    try{
        const order = await orderstableservice();
        if(order == null || order.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(order,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getordersstate = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const address = await getorderstableservice(id);
        if(address == null){
            return c.text("user not found", 404)
        }
        return c.json(address,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}

export const createorders = async(c:Context)=>{
    try{
        const order=await c.req.json();
        const createord = await createorder(order);
        if(!createord){
            return c.text("Failed to create order", 400)
        }
        return c.json({msg: createord},201)
    }
    catch(err:any){
        return c.json({err: err?.message},400)
    }
    }
    export const updateorders=async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    const order= await c.req.json();
    try{
        const searchedowner = await  getorderstableservice(id);
        if (searchedowner == undefined){
            return c.text("User not found",404)
        }
        const res= await updateorder(id,order)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
    }
    
    export const deleteorders = async(c:Context)=>{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid Id",400)
        }
        try{
            const resorder = await  getorderstableservice(id);
            if (resorder == undefined){
                return c.text("User not found",404)
            }
            const res = await deleteorder(id)
            if(!res){
                return c.text("state not updated", 404);
            }
            return c.json({msg:res},201)
        }
        catch(error:any){
            return c.json({err:error?.message},400)
        }
    }