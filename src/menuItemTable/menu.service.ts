import { eq } from "drizzle-orm" 
import db from '../drizzle/db'
import { menu_itemTable ,TImenuitem} from "../drizzle/schema"

export const menuitemservice = async (limit?: number)=>{
    if(limit){
        return await db.query.menu_itemTable.findMany({
            limit: limit,
        });
     }
     return await db.query.menu_itemTable.findMany()
}
export const getmenuitemservice =async(id: number)=>{
    return await db.query.menu_itemTable.findFirst({
        where: eq(menu_itemTable.id,id)
    })
 }

 export const createmenuitem = async(menuitem: TImenuitem)=>{
    await db.insert(menu_itemTable).values(menuitem)
    return "ordermenu created successfiully"
 }

 export const updatemenuitem = async(id:number ,menuI:TImenuitem)=>{
    await db.update(menu_itemTable).set(menuI).where(eq(menu_itemTable.id,id))
    return "updated successfully"
 }

 export const deletemenuitem= async(id:number)=>{
    await db.delete(menu_itemTable).where(eq(menu_itemTable.id,id))
    return "deleted successfully"
 }