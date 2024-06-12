import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {resraurantO} from '../validator'
import {adminAuth, bearauth, userAuth} from '../middleware/bearAuth'
import{ restaurantownerstate ,getrestaurantownerstate,createresowner,updateresowner,deleteresowner}from './restaurant.controller'
export const restaurantowner = new Hono()

restaurantowner.get("/owner",userAuth, restaurantownerstate)

restaurantowner
.get("owner",getrestaurantownerstate)

restaurantowner
.post("/ownerinsert", zValidator("json",resraurantO,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createresowner)

restaurantowner.put("/ownerupdate/:id",updateresowner)

restaurantowner.delete("/ownerdelete/:id",deleteresowner)