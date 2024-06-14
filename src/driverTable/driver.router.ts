import { Hono } from 'hono'
import {zValidator} from "@hono/zod-validator"
import { driverVAL } from '../validator'
import { driverAuth } from '../middleware/bearAuth'
import{ driverstate,getdriverstate,createdrivers,updatedrivers,deletedrivers,getdriverstatereq   }from './driver.controller'
export const driver = new Hono()

driver.get("/driver",driverAuth,driverstate)

driver.get("/driver/:id",getdriverstate)
driver.get("/driver/:id/req",getdriverstatereq)

driver
.post("/driverinsert",zValidator("json",driverVAL,(result,c)=>{
    if(!result.success){
        return c.json(result.error,400)
    }
}),createdrivers)

driver.put("/updatedriver/:id",updatedrivers)

driver.delete("/deletedriver/:id",deletedrivers)