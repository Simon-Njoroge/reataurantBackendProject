import { Context } from "hono";
import { driversservice,getdrverservice,createdriver,updatedriver,deletedriver,getdrverservicereq} from './driver.service'

export const driverstate = async (c:Context) =>{
    try{
        const driver = await driversservice();
        if(driver == null || driver.length == 0){
            return c.text("user not found", 404)
        }
        return c.json(driver,200)
    }
    catch(err: any){
        return c.json({err: err?.message},400)
    }
}
export const getdriverstate = async (c:Context) =>{
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const driver = await  getdrverservice (id);
        if(driver == null){
            return c.text("user not found", 404)
        }
        return c.json(driver,200)
    }
    catch (err:any){
        return c.json({err: err?.message},400)
    }
}
export const createdrivers = async(c:Context)=>{
    try{
        const dri= await c.req.json();
        const createdriv = await createdriver(dri);
        if(!createdriv){
            return c.text("Failed to create driver", 404)
        }
        return c.json({msg: createdriv},201)
    }
    catch(error:any){
        return c.json({err: error?.message},400)
    }
    }
    export const updatedrivers=async(c:Context)=>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)){
        return c.text("Invalid Id",400)
    }
    const drivert= await c.req.json();
    try{
        const searcheddriver = await getdrverservice(id);
        if (searcheddriver == undefined){
            return c.text("User not found",404)
        }
        const res= await updatedriver(id,drivert)
        if(!res){
            return c.text("state not updated", 404);
        }
        return c.json({msg:res},201)
    }
    catch(error:any){
        return c.json({err:error?.message},400)
    }
    }
    
    export const deletedrivers = async(c:Context)=>{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)){
            return c.text("Invalid Id",400)
        }
        try{
            const Odriver = await  getdrverservice(id);
            if (Odriver == undefined){
                return c.text("User not found",404)
            }
            const res = await deletedriver(id)
            if(!res){
                return c.text("state not updated", 404);
            }
            return c.json({msg:res},201)
        }
        catch(error:any){
            return c.json({err:error?.message},400)
        }
    }

    export const getdriverstatereq = async (c:Context) =>{
        try{
            const id = parseInt(c.req.param("id"));
            if(isNaN(id)){
                return c.text("Invalid id", 400)
            }
            const drivd = await  getdrverservicereq (id);
            if(drivd == null){
                return c.text("user not found", 404)
            }
            return c.json(drivd,200)
        }
        catch (err:any){
            return c.json({err: err?.message},400)
        }
    }