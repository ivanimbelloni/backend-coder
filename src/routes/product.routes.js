import { Router } from "express"
import ProductManager from "../classes/productManager.js"

const routerProds = Router()
const prod = new ProductManager()


routerProds.get("/",  async (req, res )=>{
    const prods = await prod.readProds(pathProds)
    const limit = parseInt(req.query.limit)
    if(limit && limit>0){
        let prodsLimit = prods.slice(0,limit)
        res.status(200).json(prodsLimit)
    }
    else{
        res.json(prods)
    }
})

routerProds.get("/:id" , async (req,res)=>{
    const {id} = req.params

    const product = await prod.getProductById(parseInt(id))

    if (!product){
        res.send({error: "el producto no se encuentra"})
    }
    else{
        res.json(product)
    }
})

routerProds.post('/', async (req,res)=>{
    let quest = req.body

    let product = await prod.addProduct(quest)
    if( product.status ){
        res.status(201).json(product)
    }
    else{
        res.status(400).console.error("error en el post ");
    }
})

routerProds.put('/:prodId', async (req, res)=>{
    let prodId = parseInt(req.params.prodId)

    if(prodId){
        let product = await prod.updateProduct(prodId, req.body)

        if (product.data.status){
            res.status(201).json({data: product.data, message})
        }
        else{
            res.status(404).json({message: product.error})
        }
    }
    else{
        res.status(404).json({message: " No se encontro ese id "})
    }
})
routerProds.delete('/:prodId', async (req, res)=>{
    let prodId = parseInt(req.params.prodId)
    if(prodId){
        let answer = await prod.deleteProd(prodId)
        if (answer.status){
            res.status(201).json({message: answer.message})
        }
        else{
            res.status(404).json({error: answer.message})
        }
    }
    else {
        res.status(404).json({ message:"El id es incorrecto"})
    }
})

export default routerProds