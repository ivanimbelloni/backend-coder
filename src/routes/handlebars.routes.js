import { Router } from "express";
import ProductManager from "../classes/productManager.js";


const prods = new ProductManager()
const handlebarRoute = Router() 

handlebarRoute.get('/home' ,async  (req, res )=>{
    const products = await (prods.getProducts()).data

    res.render('home',{
        "array":products
    })
})
export default handlebarRoute