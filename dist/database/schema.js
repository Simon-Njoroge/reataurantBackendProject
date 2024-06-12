"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusrelations = exports.ordersrelations = exports.orderstatusrelations = exports.driverrealations = exports.menu_itemrelationsrealtions = exports.cityresrealtions = exports.menurealtions = exports.ordersrealations = exports.address = exports.cityrealations = exports.restaurantralations = exports.statecityrelations = exports.cityralations = exports.ordersTable = exports.statusCatalogTable = exports.orderStatusTable = exports.orderMenuTable = exports.categoryTable = exports.menu_itemTable = exports.commentsTable = exports.driverTable = exports.addressTable = exports.restaurantTable = exports.usersTable = exports.restaurant_owner = exports.stateTable = exports.cityTable = void 0;
require("dotenv/config");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
const pg_core_4 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_5 = require("drizzle-orm/pg-core");
exports.cityTable = (0, pg_core_5.pgTable)("cityTable", {
    cityid: (0, pg_core_5.serial)("id").primaryKey(),
    cityname: (0, pg_core_5.varchar)("name", { length: 256 }).notNull(),
    state_id: (0, pg_core_4.integer)("state_id").references(() => exports.stateTable.id, { onDelete: "cascade" }),
    address: (0, pg_core_5.varchar)("address", { length: 100 }).notNull(),
    state: (0, pg_core_5.varchar)("state", { length: 200 }).notNull(),
    restaurant: (0, pg_core_5.varchar)("restaurant", { length: 40 }).notNull()
});
exports.stateTable = (0, pg_core_5.pgTable)("stateTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    stateName: (0, pg_core_5.varchar)("stateName", { length: 20 }).notNull(),
    stateCode: (0, pg_core_4.integer)("stateCode"),
    city: (0, pg_core_5.varchar)("city", { length: 100 }).notNull(),
});
exports.restaurant_owner = (0, pg_core_5.pgTable)("restaurant_owner", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    restaurant_id: (0, pg_core_4.integer)("restaurant_id").notNull().references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    owner_id: (0, pg_core_4.integer)("owner_id").references(() => exports.usersTable.id, { onDelete: "cascade" }),
    users: (0, pg_core_5.varchar)("users", { length: 100 }).notNull(),
    restaurant: (0, pg_core_5.varchar)("restaurant", { length: 200 }).notNull()
});
exports.usersTable = (0, pg_core_5.pgTable)("usersTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    name: (0, pg_core_5.varchar)("name", { length: 100 }).notNull(),
    contactPhone: (0, pg_core_5.varchar)("contactPhone", { length: 100 }).notNull(),
    phone_verified: (0, pg_core_3.boolean)("phone_verified"),
    email: (0, pg_core_5.varchar)("email", { length: 200 }).notNull(),
    email_verified: (0, pg_core_3.boolean)("email_verified"),
    confirmation_code: (0, pg_core_5.varchar)("confirmation_code", { length: 20 }),
    password: (0, pg_core_5.varchar)("password", { length: 100 }).notNull(),
    created_at: (0, pg_core_2.timestamp)("created_at").notNull(),
    updated_at: (0, pg_core_2.timestamp)("updated_at").notNull(),
    address: (0, pg_core_5.varchar)("created_at", { length: 100 }).notNull(),
    comment: (0, pg_core_5.varchar)("comment", { length: 256 }),
    driver: (0, pg_core_5.varchar)("driver", { length: 20 }),
    order: (0, pg_core_5.varchar)("order", { length: 20 }),
    restaurant_owner: (0, pg_core_5.varchar)("restaurant_owner", { length: 20 })
});
exports.restaurantTable = (0, pg_core_5.pgTable)("restaurantTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    name: (0, pg_core_5.varchar)("name", { length: 100 }).notNull(),
    street_adress: (0, pg_core_5.varchar)("street_address", { length: 100 }).notNull(),
    zip_code: (0, pg_core_5.varchar)("zip_code", { length: 200 }).notNull(),
    city_id: (0, pg_core_4.integer)("city_id").references(() => exports.cityTable.cityid, { onDelete: "cascade" }),
    created_at: (0, pg_core_2.timestamp)("created_at").notNull(),
    updated_at: (0, pg_core_2.timestamp)("updated_at").notNull(),
    menu_item: (0, pg_core_5.varchar)("menu_item", { length: 100 }).notNull(),
    order: (0, pg_core_5.varchar)("order", { length: 20 }),
    city: (0, pg_core_5.varchar)("city", { length: 20 }),
    restaurant_owner: (0, pg_core_5.varchar)("restaurant_owner", { length: 100 })
});
exports.addressTable = (0, pg_core_5.pgTable)("addressTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    address1: (0, pg_core_5.varchar)("address1", { length: 100 }).notNull(),
    address2: (0, pg_core_5.varchar)("address2", { length: 100 }).notNull(),
    zip_code: (0, pg_core_5.varchar)("zip_code", { length: 100 }).notNull(),
    instructions: (0, pg_core_5.varchar)("instructions", { length: 100 }).notNull(),
    user_id: (0, pg_core_5.varchar)("user_id", { length: 20 }),
    city_id: (0, pg_core_4.integer)("city_id").references(() => exports.cityTable.cityid, { onDelete: "cascade" }),
    created_at: (0, pg_core_2.timestamp)("created_at").notNull(),
    updated_at: (0, pg_core_2.timestamp)("updated_at").notNull(),
    city: (0, pg_core_5.varchar)("city", { length: 100 }).notNull(),
    users: (0, pg_core_5.varchar)("users", { length: 256 }),
    order: (0, pg_core_5.varchar)("order", { length: 20 }),
});
exports.driverTable = (0, pg_core_5.pgTable)("driverTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    carMake: (0, pg_core_5.varchar)("carMake", { length: 100 }).notNull(),
    carModel: (0, pg_core_5.varchar)("carModel", { length: 100 }).notNull(),
    carYear: (0, pg_core_5.varchar)("carYear", { length: 100 }).notNull(),
    instructions: (0, pg_core_5.varchar)("instructions", { length: 100 }).notNull(),
    user_id: (0, pg_core_4.integer)("user_id").references(() => exports.usersTable.id, { onDelete: "cascade" }),
    city_id: (0, pg_core_4.integer)("city_id").references(() => exports.cityTable.cityid, { onDelete: "cascade" }),
    online: (0, pg_core_5.varchar)("online", { length: 100 }).notNull(),
    delivering: (0, pg_core_5.varchar)("delivering", { length: 100 }).notNull(),
    created_at: (0, pg_core_2.timestamp)("created_at").notNull(),
    updated_at: (0, pg_core_2.timestamp)("updated_at").notNull(),
    users: (0, pg_core_5.varchar)("users", { length: 256 }),
    order: (0, pg_core_5.varchar)("order", { length: 20 }),
});
exports.commentsTable = (0, pg_core_5.pgTable)("commentsTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    orderid: (0, pg_core_4.integer)("orderid"),
    userid: (0, pg_core_4.integer)("userid"),
    comments: (0, pg_core_5.varchar)("carMake", { length: 100 }).notNull(),
    complaint: (0, pg_core_5.varchar)("carModel", { length: 100 }).notNull(),
    praise: (0, pg_core_5.varchar)("carYear", { length: 100 }).notNull(),
    created_at: (0, pg_core_2.timestamp)("created_at").notNull(),
    updated_at: (0, pg_core_2.timestamp)("updated_at").notNull(),
    users: (0, pg_core_5.varchar)("users", { length: 256 }),
    order: (0, pg_core_5.varchar)("order", { length: 20 }),
});
exports.menu_itemTable = (0, pg_core_5.pgTable)("menu_itemTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    restaurantid: (0, pg_core_4.integer)("restaurantid").references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    categoryid: (0, pg_core_4.integer)("categoryid").references(() => exports.categoryTable.id, { onDelete: "cascade" }),
    descriptions: (0, pg_core_5.varchar)("carMake", { length: 100 }).notNull(),
    ingredients: (0, pg_core_5.varchar)("carModel", { length: 100 }).notNull(),
    price: (0, pg_core_1.decimal)("price").notNull(),
    active: (0, pg_core_3.boolean)("active").notNull(),
    created_at: (0, pg_core_2.timestamp)("created_at").notNull(),
    updated_at: (0, pg_core_2.timestamp)("updated_at").notNull(),
    category: (0, pg_core_5.varchar)("category", { length: 256 }).notNull(),
    restaurant: (0, pg_core_5.varchar)("restaurant", { length: 256 }),
    orderMenu: (0, pg_core_5.varchar)("orderMenu", { length: 20 }),
});
exports.categoryTable = (0, pg_core_5.pgTable)("categoryTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    name: (0, pg_core_5.varchar)("name", { length: 100 }).notNull(),
    menuItem: (0, pg_core_5.varchar)("menuItem", { length: 100 }).notNull()
});
exports.orderMenuTable = (0, pg_core_5.pgTable)("orderMenuTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    orderId: (0, pg_core_4.integer)("orderId"),
    menuItemid: (0, pg_core_4.integer)("menuItemid").references(() => exports.menu_itemTable.id).notNull(),
    quantity: (0, pg_core_4.integer)("quantity").notNull(),
    itemPrice: (0, pg_core_1.decimal)("itemPrice").notNull(),
    price: (0, pg_core_1.decimal)("price").notNull(),
    comment: (0, pg_core_5.varchar)("comment", { length: 256 }),
    menuItem: (0, pg_core_5.varchar)("menuItem", { length: 256 }),
    order: (0, pg_core_5.varchar)("order", { length: 20 })
});
exports.orderStatusTable = (0, pg_core_5.pgTable)("orderStatusTable", {
    id: (0, pg_core_5.serial)("id").primaryKey().unique(),
    orderId: (0, pg_core_4.integer)("orderid").references(() => exports.ordersTable.id, { onDelete: "cascade" }),
    statusCatalogId: (0, pg_core_4.integer)("statusCatalogId").references(() => exports.statusCatalogTable.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_2.timestamp)("createdAt"),
    order: (0, pg_core_5.varchar)("order", { length: 20 }),
    statusCatalog: (0, pg_core_5.varchar)("statusCatalog", { length: 20 })
});
exports.statusCatalogTable = (0, pg_core_5.pgTable)("statusCatalogTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    name: (0, pg_core_5.varchar)("name", { length: 20 }),
    orderStatus: (0, pg_core_5.varchar)("orderStatus", { length: 20 })
});
exports.ordersTable = (0, pg_core_5.pgTable)("orderTable", {
    id: (0, pg_core_5.serial)("id").primaryKey(),
    restaurantId: (0, pg_core_4.integer)("restaurantId").references(() => exports.restaurantTable.id, { onDelete: "cascade" }),
    statusCatalogId: (0, pg_core_4.integer)("statusCatalogId"),
    estimateddelivery: (0, pg_core_2.timestamp)("estimateddelivery"),
    actualdelivery: (0, pg_core_2.timestamp)("estimateddelivery"),
    deliveryAddressId: (0, pg_core_4.integer)("ddeliveryAddressId").references(() => exports.addressTable.id, { onDelete: "cascade" }),
    userId: (0, pg_core_4.integer)("userId").references(() => exports.usersTable.id, { onDelete: "cascade" }),
    driverId: (0, pg_core_4.integer)("driverId").references(() => exports.driverTable.id, { onDelete: "cascade" }),
    price: (0, pg_core_1.decimal)("price").notNull(),
    discount: (0, pg_core_1.decimal)("discount").notNull(),
    finalPrice: (0, pg_core_1.decimal)("finalPrice").notNull(),
    created_at: (0, pg_core_2.timestamp)("created_at").notNull(),
    updated_at: (0, pg_core_2.timestamp)("updated_at").notNull(),
    comment: (0, pg_core_5.varchar)("comment", { length: 256 }),
    orderMenuItem: (0, pg_core_5.varchar)("orderMenuItem", { length: 20 }),
    orderStatus: (0, pg_core_5.varchar)("orderStatus", { length: 20 }),
    address: (0, pg_core_5.varchar)("address", { length: 20 }),
    driver: (0, pg_core_5.varchar)("driver", { length: 20 }),
    restaurant: (0, pg_core_5.varchar)("restaurant", { length: 20 }),
    user: (0, pg_core_5.varchar)("user", { length: 20 })
});
exports.cityralations = (0, drizzle_orm_1.relations)(exports.cityTable, ({ one }) => ({
    orderStatus: one(exports.stateTable, {
        fields: [exports.cityTable.cityid],
        references: [exports.stateTable.id]
    })
}));
exports.statecityrelations = (0, drizzle_orm_1.relations)(exports.stateTable, ({ one, many }) => ({
    orders: many(exports.cityTable)
}));
exports.restaurantralations = (0, drizzle_orm_1.relations)(exports.restaurantTable, ({ one }) => ({
    orderStatus: one(exports.cityTable, {
        fields: [exports.restaurantTable.city_id],
        references: [exports.cityTable.cityid]
    })
}));
exports.cityrealations = (0, drizzle_orm_1.relations)(exports.cityTable, ({ one, many }) => ({
    orders: many(exports.restaurantTable)
}));
exports.address = (0, drizzle_orm_1.relations)(exports.addressTable, ({ one }) => ({
    orderStatus: one(exports.cityTable, {
        fields: [exports.addressTable.city_id],
        references: [exports.cityTable.cityid]
    })
}));
exports.ordersrealations = (0, drizzle_orm_1.relations)(exports.cityTable, ({ one, many }) => ({
    orders: many(exports.addressTable)
}));
exports.menurealtions = (0, drizzle_orm_1.relations)(exports.menu_itemTable, ({ one }) => ({
    orderStatus: one(exports.restaurantTable, {
        fields: [exports.menu_itemTable.restaurantid],
        references: [exports.restaurantTable.id]
    })
}));
exports.cityresrealtions = (0, drizzle_orm_1.relations)(exports.restaurantTable, ({ one, many }) => ({
    orders: many(exports.menu_itemTable)
}));
exports.menu_itemrelationsrealtions = (0, drizzle_orm_1.relations)(exports.ordersTable, ({ one }) => ({
    orderStatus: one(exports.driverTable, {
        fields: [exports.ordersTable.driverId],
        references: [exports.driverTable.id]
    })
}));
exports.driverrealations = (0, drizzle_orm_1.relations)(exports.driverTable, ({ one, many }) => ({
    orders: many(exports.ordersTable)
}));
exports.orderstatusrelations = (0, drizzle_orm_1.relations)(exports.orderStatusTable, ({ one }) => ({
    orderstatus: one(exports.ordersTable, {
        fields: [exports.orderStatusTable.orderId],
        references: [exports.ordersTable.id]
    })
}));
exports.ordersrelations = (0, drizzle_orm_1.relations)(exports.ordersTable, ({ one, many }) => ({
    order: many(exports.orderStatusTable)
}));
exports.orderStatusrelations = drizzle_orm_1.relations;
// export const restaurantrelations= relations(restaurantTable,({one})=>({
// orderStatus:one(restaurant_owner,{
// fields:[restaurantTable.id],
// references:[restaurant_owner.id]
// })
// }))
// export const restaurantownerrealtions = relations(restaurant_owner,({one,many})=>({
// orders:many(restaurantTable)
// }))
// export const restaurantrelations2= relations(restaurantTable,({one})=>({
// orderStatus:one(menu_itemTable,{
// fields:[restaurantTable.id],
// references:[menu_itemTable.restaurantid]
// })
// }))
// export const restaurantmenurelations = relations(menu_itemTable,({one,many})=>({
// orders:many(restaurantTable)
// }))
// export const menu_itemrelations= relations(menu_itemTable,({one})=>({
// orderStatus:one(orderMenuTable,{
// fields:[menu_itemTable.id],
// references:[orderMenuTable.menuItemid]
// })
// }))
// export const menuodreitemrelations = relations(orderMenuTable,({one,many})=>({
// orders:many(menu_itemTable)
// }))
