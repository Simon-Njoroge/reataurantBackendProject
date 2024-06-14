import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import {logger} from "hono/logger"
import {csrf} from 'hono/csrf'
import {timeout} from 'hono/timeout'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { prometheus } from '@hono/prometheus'
import {restaurantowner} from './restaurantOwner/restaurant.router'
import {orders} from './ordeTable/orders.router'
import {menuitem} from './orderMenuTable/menuitem.router'
import{city} from './cityTable/city.router'
import {menu} from './menuItemTable/menu.router'
import {driver} from './driverTable/driver.router'
import{comment} from './commentsTable/comments.router'
import {category} from './categoryTable/category.router'
import{authRouter} from './auth/auth.router'
import{address} from './adressTable/address.router'
import {users} from './users/user.router'
import {verifyToken} from './middleware/bearAuth'
import { readFileSync } from 'fs'
const app = new Hono()
app.use(logger())
app.use(csrf())
app.use(trimTrailingSlash())
app.use('/api/time',timeout(5000))

app.get('/', async (c)=>{
  try{
    let html =readFileSync('./index.html', "utf-8");
    return c.html(html);
  }catch(error: any){
    return c.json ({error: error.message, status:500})
  }
})


app.get('/api/time', async(c)=>{
  await setTimeout(()=>{
    console.log("hello hono this is simon")
  },5000)
})
app.route("/api",restaurantowner)
app.route("/api",orders)
app.route("/api",menuitem)
app.route("/api",menu)
app.route("/api",driver)
app.route("/api",city)
app.route("/api",comment)
app.route("/api/auth",authRouter)
app.route("/api",category)
app.route("/api",address)
app.route("/api",users)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})
console.log(`Server is running on port ${process.env.PORT}`)

