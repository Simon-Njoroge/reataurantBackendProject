import { eq } from "drizzle-orm" 
import {db} from '../drizzle/db'
import {  commentsTable, TIcomments} from "../drizzle/schema"

export const commentservice = async (limit?: number)=>{
    if(limit){
        return await db.query.commentsTable.findMany({
            limit: limit,
        });
     }
     return await db.query.commentsTable.findMany()
}
export const getcommentservice =async(id: number)=>{
    return await db.query.commentsTable.findFirst({
        where: eq(commentsTable.id,id)
    })
 }

 export const createcomment = async(comment: TIcomments)=>{
    await db.insert(commentsTable).values(comment)
    return "ordermenu created successfiully"
 }

 export const updatecomment = async(id:number ,city:TIcomments)=>{
    await db.update(commentsTable).set(city).where(eq(commentsTable.id,id))
    return "updated successfully"
 }

 export const deletecomment= async(id:number)=>{
    await db.delete(commentsTable).where(eq(commentsTable,id))
    return "deleted successfully"
 }