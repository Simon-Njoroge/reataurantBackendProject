import "dotenv/config";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from './schema';

const databaseUrl = ("postgresql://restaurantDatabase_owner:oEV0H7BhOmwM@ep-withered-mouse-a5jn6c27.us-east-2.aws.neon.tech/restaurantDatabase?sslmode=require");
if (!databaseUrl) throw new Error("DATABASE_URL is not set");

const sql = neon(databaseUrl);

export const db: NeonHttpDatabase<typeof schema> = drizzle(sql, { schema, logger: true });