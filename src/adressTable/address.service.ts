import { eq } from "drizzle-orm" 
import {db} from '../drizzle/db'
import {  addressTable, TIadress} from "../drizzle/schema"

export const addressservice = async (limit?: number)=>{
    if(limit){
        return await db.query.addressTable.findMany({
            limit: limit,
        });
     }
     return await db.query.addressTable.findMany()
}
export const getaddressservice =async(id: number)=>{
    return await db.query.addressTable.findFirst({
        where: eq(addressTable.id,id),
        columns:{
         address1:true,
         address2:true,
         zip_code:true,
        }
    })
 }

 export const createaddress= async(address: TIadress)=>{
    await db.insert(addressTable).values(address)
    return "ordermenu created successfiully"
 }

 export const updateaddress = async(id:number ,city:TIadress)=>{
    await db.update(addressTable).set(city).where(eq(addressTable.id,id))
    return "updated successfully"
 }

 export const deleteaddress= async(id:number)=>{
    await db.delete(addressTable).where(eq(addressTable.id,id))
    return "deleted successfully"
 }