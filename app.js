import Express  from "express"
import ProductManager from "./src/classes/productManager.js"
const app = Express()
const prod = new ProductManager()


app.get("/products",  async (req, res )=>{
    const prods = await prod.getProducts()
   res.json(prods)
})

app.get("/products/:id" , async (req,res)=>{
    const {id} = req.params

    const product = await prod.getProductById(parseInt(id))

    if (!product){
        res.send({error: "el producto no se encuentra"})
    }
    else{
        res.json(product)
    }
})
app.listen(1234 , ()=>{
    console.log("Server run on port 1234")
})