import Express, { urlencoded }  from "express"
import routerProds from "./src/routes/product.routes.js"
import routerCart from "./src/routes/cart.routes.js"
import { Server } from "socket.io"
import { engine } from "express-handlebars"
import { dirname, join } from "path"
import http from 'http'
import handlebarRoute from "./src/routes/handlebars.routes.js"
import realTimeProductsRouter from "./src/routes/realTimeProducts.routes.js"
import { fileURLToPath } from "url"
const app = Express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use(Express.json())
app.use(urlencoded({extended:true}))

const server = http.createServer(app)

const io = new Server(server)
export { io }      

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('view', join(__dirname, '../src/views'))


app.use('/api/products' , routerProds)
app.use('/api/carts' , routerCart)
app.use('/handlebars' , handlebarRoute)
app.use('/realTimeProducts' , realTimeProductsRouter)

app.listen(8080 , ()=>{
    console.log("Server run on port 8080 | http://localhost:8080/api/")
})
