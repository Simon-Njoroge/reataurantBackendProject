import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {menuI} from "../validator"
import{ ordermenustate, getordermenustate,createordermenut,updateordermenut, deleteordermenut}from './menu.controller'
export const menuitem = new Hono()

menuitem.get("/menuitem",ordermenustate)

menuitem.get("menuitem",getordermenustate)

menuitem.post("/menuinsert",zValidator("json",menuI,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createordermenut)

menuitem.put("/menuupdate/:id",updateordermenut)

menuitem.delete("/menudelete/:id",deleteordermenut)