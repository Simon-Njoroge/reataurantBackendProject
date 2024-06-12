import { Hono } from 'hono'
import{  orderstablestate, getordersstate,createorders ,updateorders,deleteorders}from './orders.controller'
import {zValidator} from "@hono/zod-validator"
import {order} from '../validator'
export const orders = new Hono()

orders.get("/order",orderstablestate)

orders.get("/order",getordersstate)


orders
.post("/orderinsert",zValidator("json",order,(result,c)=>{
    if(!result.success){
       return c.json(result.error,400)
    }
}),createorders)

orders.put("/ownerupdate/:id",updateorders)

orders.delete("/ownerdelete/:id",deleteorders)