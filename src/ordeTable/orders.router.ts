import { Hono } from 'hono'
import{  orderstablestate,getorderstableservicefulls ,getordersstate,createorders ,updateorders,deleteorders}from './orders.controller'
import {zValidator} from "@hono/zod-validator"
import {adminAuth, bothauth, userAuth} from '../middleware/bearAuth'
import {order} from '../validator'
export const orders = new Hono()

orders.get("/order",adminAuth,orderstablestate)

orders.get("/order/:id/full",userAuth,getorderstableservicefulls)

orders.get("/order/:id",userAuth,getordersstate)
orders
.post("/orderinsert",adminAuth,zValidator("json",order,(result,c)=>{
    if(!result.success){
       return c.json(result.error,400)
    }
}),createorders)

orders.put("/ownerupdate/:id",adminAuth,updateorders)

orders.delete("/ownerdelete/:id",bothauth,deleteorders)