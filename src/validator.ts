import { z } from "zod"
 export const resraurantO =z.object({
    id:z.number(),
    restaurant_id:z.number(),
    owner_id:z.number(),
    users:z.string(),
    restaurant:z.string()
 })

 export const order =z.object({
    id:z.number(),
    restaurantId:z.number(),
    statusCatalogId:z.number(),
    estimateddelivery:z.string(),
    actualdelivery:z.string(),
    deliveryAddressId:z.number(),
    userId:z.number(),
    driverId:z.number(),
    price:z.string(),
    discount:z.string(),
    finalPrice:z.string(),
    created_at:z.string(),
    updated_at:z.string(),
    comment:z.string(),
    orderMenuItem:z.string(),
    orderStatus:z.string(),
    address:z.string(),
    driver:z.string(),
    restaurant:z.string(),
    user:z.string()
 })
 export const menuI =z.object({
    id:z.number(),
    orderId:z.number(),
    menuItemid:z.number(),
    quantity:z.number(),
    itemPrice:z.string(),
    price:z.string(),
    comment:z.string(),
    menuItem:z.string(),
    order:z.string()
 })
 export const menu2=z.object({
    id:z.number(),
    restaurantid:z.number(),
    categoryid:z.number(),
    descriptions:z.string(),
    ingredients:z.string(),
    price:z.string(),
    active:z.boolean(),
    created_at:z.string(),
    updated_at:z.string(),
    category:z.string(),
    restaurant:z.string(),
    orderMenu:z.string()
 })
  export const driverVAL=z.object({
    id:z.number(),
    carMake:z.string(),
    carModel:z.string(),
    carYear:z.string(),
    instructions:z.string(),
    user_id:z.number(),
    city_id:z.number(),
    online:z.string(),
    delivering:z.string(),
    created_at:z.string(),
    updated_at:z.string(),
    users:z.string(),
    order:z.string()
  })

  export const cityval=z.object({
   
   cityid: z.number(),
   cityname: z.string(),
   state_id:z.number() ,
   address:z.string() ,
   state:z.string() ,
   restaurant: z.string()
 
  })

  export const commentval = z.object({
   id: z.number(),
   orderid: z.number(),
   userid:z.number() ,
   comments:z.string(),
   complaint: z.string(),
   praise: z.string(),
   created_at: z.string(),
   updated_at: z.string(),
   users:z.string() ,
   order:z.string()
  })

  export const loginrestaurantschema= z.object({
   ownername: z.string(),
   password: z.string()
  })

  export const regesterrestaurantschema= z.object({
   ownerid: z.number(),
   ownername: z.string(),
   password: z.string(),
   role: z.string().optional()
  })

