import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {resraurantO} from '../validator'
import {adminAuth, bothauth, userAuth} from '../middleware/bearAuth'
import{ restaurantownerstate,getrestaurantownerfulls ,getrestaurantownerstate,createresowner,updateresowner,deleteresowner}from './restaurant.controller'
export const restaurantowner = new Hono()

restaurantowner.get("/owner",adminAuth, restaurantownerstate)
restaurantowner.get("/owner/:id/full",userAuth, getrestaurantownerfulls)

restaurantowner
.get("/owner/:id",userAuth,getrestaurantownerstate)

restaurantowner
.post("/ownerinsert",adminAuth ,zValidator("json",resraurantO,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createresowner)

restaurantowner.put("/ownerupdate/:id",adminAuth,updateresowner)

restaurantowner.delete("/ownerdelete/:id",adminAuth,deleteresowner)