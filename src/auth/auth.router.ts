import { Hono } from "hono";
import { zValidator} from "@hono/zod-validator";
import{regesterrestaurantschema,loginrestaurantschema} from '../validator'
import {registerowner,loginowner} from './auth.controller'
 export const authRouter = new Hono();
 authRouter.post('/register', zValidator("json",regesterrestaurantschema,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), registerowner)

authRouter.post('/login',zValidator("json",loginrestaurantschema,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),loginowner)
