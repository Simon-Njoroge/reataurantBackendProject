CREATE TABLE IF NOT EXISTS "addressTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"address1" varchar(100) NOT NULL,
	"address2" varchar(100) NOT NULL,
	"zip_code" varchar(100) NOT NULL,
	"instructions" varchar(100) NOT NULL,
	"user_id" varchar(20),
	"city_id" integer,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"city" varchar(100) NOT NULL,
	"users" varchar(256),
	"order" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categoryTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"menuItem" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cityTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"state_id" integer,
	"address" varchar(100) NOT NULL,
	"state" varchar(200) NOT NULL,
	"restaurant" varchar(40) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "commentsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderid" integer,
	"userid" integer,
	"carMake" varchar(100) NOT NULL,
	"carModel" varchar(100) NOT NULL,
	"carYear" varchar(100) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"users" varchar(256),
	"order" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "driverTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"carMake" varchar(100) NOT NULL,
	"carModel" varchar(100) NOT NULL,
	"carYear" varchar(100) NOT NULL,
	"instructions" varchar(100) NOT NULL,
	"user_id" integer,
	"city_id" integer,
	"online" varchar(100) NOT NULL,
	"delivering" varchar(100) NOT NULL,
	"created_at" varchar(256),
	"updated_at" varchar(256),
	"users" varchar(256),
	"order" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_itemTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurantid" integer,
	"categoryid" integer,
	"carMake" varchar(100) NOT NULL,
	"carModel" varchar(100) NOT NULL,
	"price" numeric NOT NULL,
	"active" boolean NOT NULL,
	"created_at" varchar NOT NULL,
	"updated_at" varchar NOT NULL,
	"category" varchar(256) NOT NULL,
	"restaurant" varchar(256),
	"orderMenu" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderMenuTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" integer,
	"menuItemid" integer NOT NULL,
	"quantity" integer NOT NULL,
	"itemPrice" numeric NOT NULL,
	"price" numeric NOT NULL,
	"comment" varchar(256),
	"menuItem" varchar(256),
	"order" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderStatusTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderid" integer,
	"statusCatalogId" integer,
	"createdAt" timestamp,
	"order" varchar(20),
	"statusCatalog" varchar(20),
	CONSTRAINT "orderStatusTable_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orderTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurantId" integer,
	"statusCatalogId" integer,
	"estimateddelivery" timestamp,
	"ddeliveryAddressId" integer,
	"userId" integer,
	"driverId" integer,
	"price" numeric NOT NULL,
	"discount" numeric NOT NULL,
	"finalPrice" numeric NOT NULL,
	"created_at" varchar(20) NOT NULL,
	"updated_at" varchar(20) NOT NULL,
	"comment" varchar(256),
	"orderMenuItem" varchar(20),
	"orderStatus" varchar(20),
	"address" varchar(20),
	"driver" varchar(20),
	"restaurant" varchar(20),
	"user" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurantTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"street_address" varchar(100) NOT NULL,
	"zip_code" varchar(200) NOT NULL,
	"city_id" integer,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"menu_item" varchar(100) NOT NULL,
	"order" varchar(20),
	"city" varchar(20),
	"restaurant_owner" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant_owner" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer NOT NULL,
	"owner_id" integer,
	"users" varchar(100) NOT NULL,
	"restaurant" varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stateTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"stateName" varchar(20) NOT NULL,
	"stateCode" integer,
	"city" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statusCatalogTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(20),
	"orderStatus" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"contactPhone" varchar(100) NOT NULL,
	"phone_verified" boolean,
	"email" varchar(200) NOT NULL,
	"email_verified" boolean,
	"confirmation_code" varchar(20),
	"password" varchar(100) NOT NULL,
	"created_at" varchar(100) NOT NULL,
	"updated_at" timestamp NOT NULL,
	"comment" varchar(256),
	"driver" varchar(20),
	"order" varchar(20),
	"restaurant_owner" varchar(20)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "addressTable" ADD CONSTRAINT "addressTable_city_id_cityTable_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cityTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cityTable" ADD CONSTRAINT "cityTable_state_id_stateTable_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."stateTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "driverTable" ADD CONSTRAINT "driverTable_user_id_usersTable_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."usersTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "driverTable" ADD CONSTRAINT "driverTable_city_id_cityTable_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cityTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_itemTable" ADD CONSTRAINT "menu_itemTable_restaurantid_restaurantTable_id_fk" FOREIGN KEY ("restaurantid") REFERENCES "public"."restaurantTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_itemTable" ADD CONSTRAINT "menu_itemTable_categoryid_categoryTable_id_fk" FOREIGN KEY ("categoryid") REFERENCES "public"."categoryTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderMenuTable" ADD CONSTRAINT "orderMenuTable_menuItemid_menu_itemTable_id_fk" FOREIGN KEY ("menuItemid") REFERENCES "public"."menu_itemTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderStatusTable" ADD CONSTRAINT "orderStatusTable_orderid_orderTable_id_fk" FOREIGN KEY ("orderid") REFERENCES "public"."orderTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderStatusTable" ADD CONSTRAINT "orderStatusTable_statusCatalogId_statusCatalogTable_id_fk" FOREIGN KEY ("statusCatalogId") REFERENCES "public"."statusCatalogTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderTable" ADD CONSTRAINT "orderTable_restaurantId_restaurantTable_id_fk" FOREIGN KEY ("restaurantId") REFERENCES "public"."restaurantTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderTable" ADD CONSTRAINT "orderTable_ddeliveryAddressId_addressTable_id_fk" FOREIGN KEY ("ddeliveryAddressId") REFERENCES "public"."addressTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderTable" ADD CONSTRAINT "orderTable_userId_usersTable_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."usersTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orderTable" ADD CONSTRAINT "orderTable_driverId_driverTable_id_fk" FOREIGN KEY ("driverId") REFERENCES "public"."driverTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurantTable" ADD CONSTRAINT "restaurantTable_city_id_cityTable_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cityTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_restaurant_id_restaurantTable_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurantTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_owner_id_usersTable_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."usersTable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
