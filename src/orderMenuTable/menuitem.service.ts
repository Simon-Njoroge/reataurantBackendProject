import { eq } from "drizzle-orm" 
import db from '../drizzle/db'
import {  orderMenuTable, TIorder, TIordermenu} from "../drizzle/schema"

export const ordermenuservice = async (limit?: number)=>{
    if(limit){
        return await db.query.orderMenuTable.findMany({
            limit: limit,
        });
     }
     return await db.query.orderMenuTable.findMany()
}
export const getordermenuservice =async(id: number)=>{
    return await db.query.orderMenuTable.findFirst({
        where: eq(orderMenuTable.id,id),
        
    })
 }

 export const createordermenu = async(ordermenu: TIordermenu)=>{
    await db.insert(orderMenuTable).values(ordermenu)
    return "ordermenu created successfiully"
 }

 export const updateordermenu = async(id:number ,ordermenu:TIordermenu)=>{
    await db.update(orderMenuTable).set(ordermenu).where(eq(orderMenuTable.id,id))
    return "updated successfully"
 }

 export const deleteordermenu= async(id:number)=>{
    await db.delete(orderMenuTable).where(eq(orderMenuTable.id,id))
    return "deleted successfully"
 }