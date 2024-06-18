import { eq } from "drizzle-orm"
import { db } from '../drizzle/db'
import { categoryTable, TIcategory } from "../drizzle/schema"

export const categortyservice = async (limit?: number) => {
   if (limit) {
      return await db.query.categoryTable.findMany({
         limit: limit,
      });
   }
   return await db.query.categoryTable.findMany()
}
export const getctgoryservice = async (id: number) => {
   return await db.query.categoryTable.findFirst({
      where: eq(categoryTable.id, id),
      columns:{
         id: true,
         name:true
      }
   })
}

export const createcategory = async (category: TIcategory) => {
   await db.insert(categoryTable).values(category)
   return "ordermenu created successfiully"
}

export const updatecategory = async (id: number, city: TIcategory) => {
   await db.update(categoryTable).set(city).where(eq(categoryTable.id, id))
   return "updated successfully"
}

export const deletecategory = async (id: number) => {
   await db.delete(categoryTable).where(eq(categoryTable.id, id))
   return "deleted successfully"
}