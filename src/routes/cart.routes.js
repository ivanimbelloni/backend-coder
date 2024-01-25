import { Router } from "express";
import cartmanager from "../classes/cartManager.js";

const routerCart = Router()
const cart = new cartmanager()

routerCart.post('/', async (req,res)=>{
    let product = await cart.addCart()
    if( product.status ){
        res.status(201).json({message:product.message,data:product.data })
    }
    else{
        res.status(400).console.error("error en el post ");
    }
})
routerCart.get(':cartId'), async (req,res )=>{
    const {cartId} = req.params 
    let cartGet = await cart.getCart(parseInt(cartId))
    if(cartId){

        if(cartGet.status){
            res.status(200).json({data : cartGet.data})
        }
        else{
            res.status(404).json({ message: cartGet.message})
        }
    }
    else{
        res.status(404).json({ message: " No se encontro el id "})
    }
}
routerCart.post('/:cartId/products/:prodId', async (req,res)=>{
    let cartId = parseInt(req.params.cartId)
    let prodId = parseInt(req.params.prodId)

    let addToCart = await cart.addProdsInCart(cartId, prodId)

    if (addToCart.status){
        res.status(201).json({ data: addToCart.data})
    }
    else {
        res.status(404).json({message: addToCart.message})
    }
})

export default routerCart