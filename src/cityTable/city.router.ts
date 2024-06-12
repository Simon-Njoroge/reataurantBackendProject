import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import {cityval} from "../validator"
import{cityservices,getcityservices,createcities,updatecities,deletecities}from './city.controller'
export const city = new Hono()

city.get("/city",cityservices)

city.get("city/:id",getcityservices)

city.post("cityinsert",zValidator("json",cityval,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createcities)

city.put("/cityupdate/:id",updatecities)

city.delete("/citydelte/:id",updatecities)