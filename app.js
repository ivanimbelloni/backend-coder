import Express, { urlencoded }  from "express"
import routerProds from "./src/routes/product.routes.js"
import routerCart from "./src/routes/cart.routes.js"

const app = Express()

app.use(Express.json())
app.use(urlencoded({extended:true}))

app.use('/api/products' , routerProds)
app.use('/api/carts' , routerCart)

app.listen(8080 , ()=>{
    console.log("Server run on port 8080 | http://localhost:8080/api/")
})