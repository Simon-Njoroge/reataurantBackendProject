import { Column, eq } from "drizzle-orm" 
import {db} from '../drizzle/db'
import { usersTable,TIuser, restaurant_owner} from "../drizzle/schema"

export const userservice = async (limit?:  number) => {
 if(limit){
    return await db.query.restaurant_owner.findMany({
        limit: limit,
    });
 }
 return await db.query.usersTable.findMany()
}
 export const getuserservice =async(id: number)=>{
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id,id)
    })
 }  
 export const createuser = async(user: TIuser)=>{
    await db.insert(usersTable).values(user)
    return "sate created successfiully"
 }

 export const updateuser = async(id:number ,users:TIuser)=>{
    await db.update(usersTable).set(users).where(eq(usersTable.id,id))
    return "updated successfully"
 }

 export const deleteuser= async(id:number)=>{
    await db.delete(usersTable).where(eq(usersTable.id,id))
    return "deleted successfully"
 }

 export const getuserfull =async(id: number)=>{
   return await db.query.usersTable.findFirst({
       where: eq(usersTable.id,id),
       with:{
    restaurant_owner:true
       }
     
    
   })
 
}  