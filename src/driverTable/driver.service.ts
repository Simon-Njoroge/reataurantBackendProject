import { eq } from "drizzle-orm" 
import db from '../drizzle/db'
import { driverTable, TIdriver } from "../drizzle/schema"

export const driversservice = async (limit?: number)=>{
    if(limit){
        return await db.query.driverTable.findMany({
            limit: limit,
        });
     }
     return await db.query.driverTable.findMany()
}
export const getdrverservice =async(id: number)=>{
    return await db.query.driverTable.findFirst({
        where: eq(driverTable.id,id)
    })
}

export const createdriver = async(driver: TIdriver)=>{
    await db.insert(driverTable).values(driver)
    return "ordermenu created successfiully"
 }

 export const updatedriver = async(id:number ,drivert:TIdriver)=>{
    await db.update(driverTable).set(drivert).where(eq(driverTable.id,id))
    return "updated successfully"
 }

 export const deletedriver= async(id:number)=>{
    await db.delete(driverTable).where(eq(driverTable.id,id))
    return "deleted successfully"
 }