import { Router } from "express";
import ProductManager from "../classes/productManager.js";
import { io } from "../../app.js";



const realTimeProductsRouter = Router()

const prod = new ProductManager()

realTimeProductsRouter.get('/ ', async (req, res)=>{
    const products = await ( await prod.getProducts()).data
    res.render('realTimeProducts',{
        "array": products
    })
})

 io.on('connection', (socket)=>{
    socket.on('message',(data)=>{
        if(data){
            socket.emit('hola' )
        }
    })

    socket.on('Products', (data)=>{
        const arrayProds = []
        for( let i of data){
            arrayProds.push({
                "tittle": i.tittle,
                "price": i.price,
                "category": i.category,
                "description": i.description
            })
        }
        socket.emit(arrayProds)
        })
})

export default realTimeProductsRouter
