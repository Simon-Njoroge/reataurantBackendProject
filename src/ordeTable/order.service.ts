import { eq } from "drizzle-orm" 
import {db} from '../drizzle/db'
import { driverTable, ordersTable, TIorder } from "../drizzle/schema"

export const orderstableservice = async (limit?: number)=>{
    if(limit){
        return await db.query.ordersTable.findMany({
            limit: limit,
        });
     }
     return await db.query.ordersTable.findMany()
}
export const getorderstableservice =async(id: number)=>{
    return await db.query.ordersTable.findFirst({
        where: eq(ordersTable.id,id)
    })
 }

 export const createorder = async(order: TIorder)=>{
    await db.insert(ordersTable).values(order)
    return "order created successfiully"
 }

 export const updateorder = async(id:number ,order:TIorder)=>{
    await db.update(ordersTable).set(order).where(eq(ordersTable.id,id))
    return "updated successfully"
 }

 export const deleteorder= async(id:number)=>{
    await db.delete(ordersTable).where(eq(ordersTable.id,id))
    return "deleted successfully"
 }

 export const getorderstableservicefull =async(id: number)=>{
   return await db.query.ordersTable.findFirst({
       where: eq(ordersTable.id,id),
       columns:{
         restaurantId:true,
         actualdelivery:true,
         price:true,
         restaurant:true
       },
       with:{
         driverTable:{
            columns:{
               id:true,
               order:true,
               users:true
            }
         }
       }
   })
}