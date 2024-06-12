import { eq } from "drizzle-orm" 
import db from '../drizzle/db'
import {  cityTable, TIcity} from "../drizzle/schema"

export const cityservice = async (limit?: number)=>{
    if(limit){
        return await db.query.orderMenuTable.findMany({
            limit: limit,
        });
     }
     return await db.query.cityTable.findMany()
}
export const getcityservice =async(id: number)=>{
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.cityid,id)
    })
 }

 export const createcity = async(city: TIcity)=>{
    await db.insert(cityTable).values(city)
    return "ordermenu created successfiully"
 }

 export const updatecity = async(id:number ,city:TIcity)=>{
    await db.update(cityTable).set(city).where(eq(cityTable.cityid,id))
    return "updated successfully"
 }

 export const deletecity= async(id:number)=>{
    await db.delete(cityTable).where(eq(cityTable.cityid,id))
    return "deleted successfully"
 }