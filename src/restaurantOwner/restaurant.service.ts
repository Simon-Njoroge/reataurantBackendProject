import { eq } from "drizzle-orm" 
import db from '../drizzle/db'
import { restaurant_owner , TIrestaurantowner} from "../drizzle/schema"

export const restaurantownerservice = async (limit?:  number) => {
 if(limit){
    return await db.query.restaurant_owner.findMany({
        limit: limit,
    });
 }
 return await db.query.restaurant_owner.findMany()
}
 export const getrestaurantownerservice =async(id: number)=>{
    return await db.query.restaurant_owner.findFirst({
        where: eq(restaurant_owner.id,id)
    })
 }  
 export const createowner = async(user: TIrestaurantowner)=>{
    await db.insert(restaurant_owner).values(user)
    return "sate created successfiully"
 }

 export const updateowner = async(id:number ,user:TIrestaurantowner)=>{
    await db.update(restaurant_owner).set(user).where(eq(restaurant_owner.id,id))
    return "updated successfully"
 }

 export const deleteowner= async(id:number)=>{
    await db.delete(restaurant_owner).where(eq(restaurant_owner.id,id))
    return "deleted successfully"
 }