import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import { driverVAL } from '../validator'
import{ driverstate,getdriverstate,createdrivers,updatedrivers,deletedrivers   }from './driver.controller'
export const driver = new Hono()

driver.get("/driver",driverstate)

driver.get("driver",getdriverstate)

driver
.post("/driverinsert",zValidator("json",driverVAL,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createdrivers)

driver.put("/updatedriver",updatedrivers)

driver.delete("/deletedriver",deletedrivers)