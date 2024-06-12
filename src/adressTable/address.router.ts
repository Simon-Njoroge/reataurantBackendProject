import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {addressservices,getaddressservices,createddresses,updateaddresses,deleteaddresses } from "./address.controller"
import {addressVAL} from '../validator'
export const address = new Hono()

address.get("/address",addressservices)

address.get("/address/:id",getaddressservices)

address.post("/addressinsert", zValidator("json",addressVAL,(result,c)=>{
    if(!result.success){
        return c.json({message:"Invalid Data",error:result.error})
    }
}),
createddresses)

address.put("/addressupdate/:id",updateaddresses)

address.delete("/addressdelete/:id",deleteaddresses)