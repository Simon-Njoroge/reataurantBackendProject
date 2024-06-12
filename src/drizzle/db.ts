import "dotenv/config"
import {drizzle} from "drizzle-orm/neon-http"
import * as schema from  "./schema"

import { neon } from "@neondatabase/serverless"

const client = neon(process.env.DATABASE_URL!)

const db = drizzle(client,{schema,logger:true})
export default db;