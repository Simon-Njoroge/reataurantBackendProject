
import "dotenv/config"
import { decimal, pgEnum } from "drizzle-orm/pg-core"
import { timestamp } from "drizzle-orm/pg-core"
import { boolean } from "drizzle-orm/pg-core"
import { integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import{pgTable, serial,varchar} from "drizzle-orm/pg-core"
import { Many } from "drizzle-orm"
export const cityTable= pgTable("cityTable",{
    cityid: serial("id").primaryKey(),
    cityname: varchar("name",{length:256}).notNull(),
    state_id:integer("state_id").references(()=>stateTable.id,{onDelete:"cascade"}),
    address:varchar("address",{length:100}).notNull(),
    state:varchar("state",{length:200}).notNull(),
    restaurant:varchar("restaurant",{length:40}).notNull()
})
export const stateTable= pgTable("stateTable",{
    id: serial("id").primaryKey(),
    stateName: varchar("stateName",{length:20}).notNull(),
    stateCode:integer("stateCode"),
    city:varchar("city",{length:100}).notNull(),
    
})

export const restaurant_owner= pgTable("restaurant_owner",{
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").notNull().references(()=>restaurantTable.id,{onDelete:"cascade"}),
    owner_id:integer("owner_id").references(()=>usersTable.id,{onDelete:"cascade"}),
    users:varchar("users",{length:100}).notNull(),
    restaurant:varchar("restaurant",{length:200}).notNull()
})

export const usersTable= pgTable("usersTable",{
    id: serial("id").primaryKey(),
    name: varchar("name",{length:100}).notNull(),
    contactPhone: varchar("contactPhone",{length:100}).notNull(),
    phone_verified:boolean("phone_verified"),
    email:varchar("email",{length:200}).notNull(),
    email_verified:boolean("email_verified"),
    confirmation_code:varchar("confirmation_code",{length:20}),
    password:varchar("password",{length:100}).notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    address:varchar("created_at",{length:100}).notNull(),
    comment:varchar("comment",{length:256}),
    driver:varchar("driver",{length:20}),
    order:varchar("order",{length:20}),
    restaurant_owner:varchar("restaurant_owner",{length:20})
})

export const restaurantTable= pgTable("restaurantTable",{
    id: serial("id").primaryKey(),
    name: varchar("name",{length:100}).notNull(),
    street_adress: varchar("street_address",{length:100}).notNull(),
    zip_code:varchar("zip_code",{length:200}).notNull(),
    city_id:integer("city_id").references(()=>cityTable.cityid,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    menu_item:varchar("menu_item",{length:100}).notNull(),
    order:varchar("order",{length:20}),
    city:varchar("city",{length:20}),
    restaurant_owner:varchar("restaurant_owner", {length:100})
})

export const addressTable= pgTable("addressTable",{
    id: serial("id").primaryKey(),
    address1: varchar("address1",{length:100}).notNull(),
    address2: varchar("address2",{length:100}).notNull(),
    zip_code:varchar("zip_code",{length:100}).notNull(),
    instructions:varchar("instructions",{length:100}).notNull(),
    user_id:varchar("user_id",{length:20}),
    city_id:integer("city_id").references(()=>cityTable.cityid,{onDelete:"cascade"}),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    city:varchar("city",{length:100}).notNull(),
    users:varchar("users",{length:256}),
    order:varchar("order",{length:20}),
})

export const driverTable= pgTable("driverTable",{
    id: serial("id").primaryKey(),
    carMake: varchar("carMake",{length:100}).notNull(),
    carModel: varchar("carModel",{length:100}).notNull(),
    carYear:varchar("carYear",{length:100}).notNull(),
    instructions:varchar("instructions",{length:100}).notNull(),
    user_id:integer("user_id").references(()=>usersTable.id,{onDelete:"cascade"}),
    city_id:integer("city_id").references(()=>cityTable.cityid,{onDelete:"cascade"}),
    online:varchar("online",{length:100}).notNull(),
    delivering:varchar("delivering",{length:100}).notNull(),
    created_at:varchar("created_at",{length:256}),
    updated_at:varchar("updated_at",{length:256}),
    users:varchar("users",{length:256}),
    order:varchar("order",{length:20}),
})

export const commentsTable= pgTable("commentsTable",{
    id: serial("id").primaryKey(),
    orderid: integer("orderid"),
    userid: integer("userid"),
    comments: varchar("carMake",{length:100}).notNull(),
    complaint: varchar("carModel",{length:100}).notNull(),
    praise:varchar("carYear",{length:100}).notNull(),
    created_at:timestamp("created_at").notNull(),
    updated_at:timestamp("updated_at").notNull(),
    users:varchar("users",{length:256}),
    order:varchar("order",{length:20}),
})


export const menu_itemTable= pgTable("menu_itemTable",{
    id: serial("id").primaryKey(),
    restaurantid: integer("restaurantid").references(()=>restaurantTable.id,{onDelete:"cascade"}),
    categoryid: integer("categoryid").references(()=>categoryTable.id,{onDelete:"cascade"}),
    descriptions: varchar("carMake",{length:100}).notNull(),
    ingredients: varchar("carModel",{length:100}).notNull(),
    price:decimal("price").notNull(),
    active:boolean("active").notNull(),
    created_at:varchar("created_at").notNull(),
    updated_at:varchar("updated_at").notNull(),
    category:varchar("category",{length:256}).notNull(),
    restaurant:varchar("restaurant",{length:256}),
    orderMenu:varchar("orderMenu",{length:20}),
})

export const categoryTable= pgTable("categoryTable",{
    id: serial("id").primaryKey(),
    name:varchar("name",{length:100}).notNull(),
    menuItem:varchar("menuItem",{length:100}).notNull()
})

export const orderMenuTable= pgTable("orderMenuTable",{
    id: serial("id").primaryKey(),
    orderId:integer("orderId"),
    menuItemid:integer("menuItemid").references(()=>menu_itemTable.id).notNull(),
    quantity:integer("quantity").notNull(),
    itemPrice:decimal("itemPrice").notNull(),
    price:decimal("price").notNull(),
    comment:varchar("comment",{length:256}),
    menuItem:varchar("menuItem",{length:256}) ,
    order:varchar("order",{length:20})
})


export const orderStatusTable= pgTable("orderStatusTable",{
    id: serial("id").primaryKey().unique(),
    orderId:integer("orderid").references(()=>ordersTable.id,{onDelete:"cascade"}),
    statusCatalogId:integer("statusCatalogId").references(()=>statusCatalogTable.id,{onDelete:"cascade"}),
   createdAt:timestamp("createdAt"),
   order:varchar("order",{length:20}),
   statusCatalog:varchar("statusCatalog",{length:20})
})

export const statusCatalogTable= pgTable("statusCatalogTable",{
    id: serial("id").primaryKey(),
   name:varchar("name",{length:20}),
   orderStatus:varchar("orderStatus",{length:20})
})

export const ordersTable= pgTable("orderTable",{
    id: serial("id").primaryKey(),
    restaurantId:integer("restaurantId").references(()=>restaurantTable.id,{onDelete:"cascade"}),
    statusCatalogId:integer("statusCatalogId"),
    estimateddelivery:timestamp("estimateddelivery"),
    actualdelivery:timestamp("estimateddelivery"),
    deliveryAddressId:integer("ddeliveryAddressId").references(()=>addressTable.id,{onDelete:"cascade"}),
    userId:integer("userId").references(()=>usersTable.id,{onDelete:"cascade"}),
    driverId:integer("driverId").references(()=>driverTable.id,{onDelete:"cascade"}),
    price:decimal("price").notNull(),
    discount:decimal("discount").notNull(),
    finalPrice:decimal("finalPrice").notNull(),
    created_at:varchar("created_at",{length:20}).notNull(),
    updated_at:varchar("updated_at",{length:20}).notNull(),
    comment:varchar("comment",{length:256}),
    orderMenuItem:varchar("orderMenuItem",{length:20}),
    orderStatus:varchar("orderStatus",{length:20}),
    address:varchar("address",{length:20}),
    driver:varchar("driver",{length:20}),
    restaurant:varchar("restaurant",{length:20}),
    user:varchar("user",{length:20})
    
})

export const cityralations= relations(cityTable,({one})=>({
orderStatus:one(stateTable,{
fields:[cityTable.cityid],
references:[stateTable.id]
})
}))
export const statecityrelations = relations(stateTable,({one,many})=>({
orders:many(cityTable)
}))

export const restaurantralations= relations(restaurantTable,({one})=>({
orderStatus:one(cityTable,{
fields:[restaurantTable.city_id],
references:[cityTable.cityid]
})
}))
export const cityrealations = relations(cityTable,({one,many})=>({
orders:many(restaurantTable)
}))

export const address= relations(addressTable,({one})=>({
orderStatus:one(cityTable,{
fields:[addressTable.city_id],
references:[cityTable.cityid]
})
}))
export const ordersrealations = relations(cityTable,({one,many})=>({
orders:many(addressTable)
}))

export const menurealtions= relations(menu_itemTable,({one})=>({
orderStatus:one(restaurantTable,{
fields:[menu_itemTable.restaurantid],
references:[restaurantTable.id]
})
}))
export const cityresrealtions = relations(restaurantTable,({one,many})=>({
orders:many(menu_itemTable)
}))

export const menu_itemrelationsrealtions= relations(ordersTable,({one})=>({
orderStatus:one(driverTable,{
fields:[ordersTable.driverId],
references:[driverTable.id]
})
}))
export const driverrealations = relations(driverTable,({one,many})=>({
orders:many(ordersTable)
}))


export const  orderstatusrelations =relations(orderStatusTable,({one})=>({
orderstatus:one(ordersTable,{
    fields:[orderStatusTable.orderId],
    references:[ordersTable.id]
})
}))
export const ordersrelations = relations(ordersTable,({one,many})=>({
    order:many(orderStatusTable)
}))

export const roleEnum =pgEnum("role",["admin","owner"])
export const authrestaurantOwner=pgTable("authonowner",{
    id:serial("id").primaryKey(),
    ownerid:integer("ownerid").references(()=>restaurant_owner.id,{onDelete:"cascade"}),
    password:varchar("password",{length:100}),
    ownername:varchar("username",{length:100}),
    role: roleEnum("role").default("owner")
})

export const authownerrelation = relations(authrestaurantOwner,({one})=>({
    owner:one(restaurant_owner,{
        fields:[authrestaurantOwner.ownerid],
        references:[restaurant_owner.id]
    })
}))


export type TSrestaurantowner = typeof restaurant_owner.$inferSelect
export type TIrestaurantowner = typeof restaurant_owner.$inferInsert
export type TSorder = typeof ordersTable.$inferSelect
export type TIorder = typeof ordersTable.$inferInsert
export type TSordermenu = typeof orderMenuTable.$inferSelect
export type TIordermenu = typeof orderMenuTable.$inferInsert
export type TSdriver = typeof driverTable.$inferSelect
export type TIdriver = typeof driverTable.$inferInsert
export type TScomments = typeof commentsTable.$inferSelect
export type TIcomments = typeof commentsTable.$inferInsert
export type TScity = typeof cityTable.$inferSelect
export type TIcity = typeof cityTable.$inferInsert
export type TScategory = typeof  categoryTable.$inferSelect
export type TIcategory = typeof categoryTable.$inferInsert
export type TSaddress = typeof addressTable.$inferSelect
export type TIadress = typeof addressTable.$inferInsert
export type TSmenuitem = typeof menu_itemTable.$inferSelect
export type TImenuitem = typeof menu_itemTable.$inferInsert
export type TIauthresowner =typeof authrestaurantOwner.$inferInsert
export type TSauthresowner =typeof authrestaurantOwner.$inferSelect