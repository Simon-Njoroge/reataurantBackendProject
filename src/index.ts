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
import {driver} from './driverTable/user.router'
import{comment} from './commentsTable/comments.router'
import{authRouter} from './auth/auth.router'
import {verifyToken} from './middleware/bearAuth'
const app = new Hono()
app.use(logger())
app.use(csrf())
app.use(trimTrailingSlash())
app.use('/api/time',timeout(5000))
app.get('/', (c) => {
  return c.text('Hello Hono!')
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
const port =3000
console.log(`Server is running on port 3000`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})