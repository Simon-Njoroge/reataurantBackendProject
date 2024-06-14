import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {resraurantO} from '../validator'
import {adminAuth, bothauth, userAuth} from '../middleware/bearAuth'
import{usersservices,getuserservices,createusers,updateusers,deleteusers,getuserfulls  }from './users.controller'
export const users = new Hono()

users.get("/user",adminAuth, usersservices)
users.get("/user/:id/full",userAuth, getuserfulls)

users
.get("/user/:id",userAuth,getuserservices)

users
.post("/userinsert",adminAuth ,zValidator("json",resraurantO,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createusers)

users.put("/ownerupdate/:id",adminAuth,updateusers)

users.delete("/ownerdelete/:id",adminAuth,deleteusers)