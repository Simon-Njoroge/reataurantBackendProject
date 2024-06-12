import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {categoryservices,getcategoryservices,createcategories,deletecategories, updatecategories} from "./category.controller"
import{categoryVAL}from '../validator'
export const category = new Hono()

category.get("/category",categoryservices)

category.get("/category/:id",getcategoryservices)

category.post("/categoryinsert",zValidator("json",categoryVAL,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createcategories)

category.put("/categoryupdate/:id",updatecategories)

category.delete("/categorydelete/:id",deletecategories)