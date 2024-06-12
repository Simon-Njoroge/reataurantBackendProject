import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {menu2} from "../validator"
import{ menuitemstate, getmenuitemstate,createmenuitems,updatemnuitems,deletemenuitems }from './menuitem.controller'
export const menu = new Hono()

menu.get("/menu",menuitemstate)

menu.get("/menu/:id",getmenuitemstate )

menu.post("/iteminsert",zValidator("json",menu2,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createmenuitems)

menu.put("/updateitem/:id",updatemnuitems)

menu.delete("/deleteitem/:id",deletemenuitems)