"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const timeout_1 = require("hono/timeout");
const trailing_slash_1 = require("hono/trailing-slash");
const restaurant_router_1 = require("./restaurantOwner/restaurant.router");
const orders_router_1 = require("./ordeTable/orders.router");
const menuitem_router_1 = require("./orderMenuTable/menuitem.router");
const city_router_1 = require("./cityTable/city.router");
const menu_router_1 = require("./menuItemTable/menu.router");
const driver_router_1 = require("./driverTable/driver.router");
const comments_router_1 = require("./commentsTable/comments.router");
const category_router_1 = require("./categoryTable/category.router");
const auth_router_1 = require("./auth/auth.router");
const address_router_1 = require("./adressTable/address.router");
const html_1 = require("hono/html");
const app = new hono_1.Hono();
app.use((0, logger_1.logger)());
app.use((0, csrf_1.csrf)());
app.use((0, trailing_slash_1.trimTrailingSlash)());
app.use('/api/time', (0, timeout_1.timeout)(5000));
app.get('/', (c) => {
    return c.json({ message: "server is running ..." }, 200);
});
app.get("/running", (c) => {
    return c.html((0, html_1.html) `<h1>OUR SERVER IS RUNNING</h1>
<p>Server is running on port 3000</p>
<P><i>use the resources provided</i></P>`);
});
app.get('/api/time', async (c) => {
    await setTimeout(() => {
        console.log("hello hono this is simon");
    }, 5000);
});
app.route("/api", restaurant_router_1.restaurantowner);
app.route("/api", orders_router_1.orders);
app.route("/api", menuitem_router_1.menuitem);
app.route("/api", menu_router_1.menu);
app.route("/api", driver_router_1.driver);
app.route("/api", city_router_1.city);
app.route("/api", comments_router_1.comment);
app.route("/api/auth", auth_router_1.authRouter);
app.route("/api", category_router_1.category);
app.route("/api", address_router_1.address);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});
console.log(`Server is running on port ${process.env.PORT}`);
