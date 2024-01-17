import Express  from "express"
import ProductManager from "./src/classes/productManager.js"
const app = Express()
const prod = new ProductManager()


app.get("/",  async (req, res )=>{
    const prods = await prod.getProducts()
   res.send(prods)
})

app.get("/:id" , async (req,res)=>{
    const {id} = req.params

    const product = await prod.getProductById(parseInt(id))

    if (!product){
        res.send({error: "el producto no se encuentra"})
    }
    else{
        res.send(
            `<body>
            <H1> Productos </H1>
            <div>
                <h2>id ${product.id}</h2>
                <p> ${product.tittle}</p>
                <p> ${product.description}</p>
                <p> ${product.price}</p>
                <p> ${product.code}</p>
                <p> ${product.stock}</p>
            </div>
        </body>`
        )
    }
})
app.listen(1234 , ()=>{
    console.log("Server run on port 1234")
})