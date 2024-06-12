import{authrestaurantOwner,TIauthresowner,TSauthresowner} from '../drizzle/schema'
import db from '../drizzle/db'
import {sql} from "drizzle-orm"

export const createownerauthservice = async (owners: TIauthresowner): Promise< string | null> => {
    await db.insert(authrestaurantOwner).values(owners)
    return "owner created successfully"
}
        
export const ownerloginservice = async(owner: TIauthresowner) =>{
 const {ownername,password} =owner;
 return db.query.authrestaurantOwner.findFirst({
    columns:{
        ownername: true,
        role:true,
        password:true
    }, where: sql`${authrestaurantOwner.ownername}=${ownername}`,
    with:{
    owner:{
        columns:{
            id:true,
            restaurant_id:true,
            owner_id:true,
            users:true,
            restaurant:true
        }
    }
}
 })
}