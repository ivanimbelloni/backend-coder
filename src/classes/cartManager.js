import { existsSync } from "fs"
import { writeFile } from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default class cartmanager {
    constructor(){
        this.pathCart = join(__dirname,"../data/cart.json")
        this.pathProds  = join(__dirname,"../data/products.json")
        this.cartExists ()
    }
    static id = 0
    async cartExists(){
        try{
            let exists = existsSync(this.pathCart)
            if (!exists){
                await writeFile( this.pathCart,"[]","utf-8")
                console.log(`Se a creado el archivo ${this.pathCart}`)
            }
        }
        catch(err){
            console.error("Hubo un error en la creacion del archivo", err)
        }
    }
    async readProds(path){
        try{
            return JSON.parse(await fs.readFile(path,"utf-8"))
        }
       catch(err){
            console.error("error en la lectura", err)
       }     
    }
    async writeProds(path,data){
        try{
            await fs.writeFile(path, JSON.stringify(data), 'utf-8')
        } catch (error){
            console.error("error en la escritura de archivo", error)
        }
    }
    async addCart(){
        try{
            let cart = await this.readProds(this.pathCart)   
            cartmanager.id++
            let newCart = { "productos" : [] , "id" : cartmanager.id}
            await cart.push(newCart)
            await writeFile(this.pathCart, cart)
            
            return { message: `El carrito con el id ${newCart.id} se a creado`, status: true, data:newCart}
        }
        catch(err){
            console.error(" error al agregar el carrito ", err)
        }
    }
    async getCart(id){
        try{
            let cart = await this.readProds(this.pathCart)

            let cartId = cart.find(c => c.id === id) 
        
            if(!cartId){
                console.error("No se a encontrado el carrito buscado")
            }
            if( cartId.productos.length === 0){
                return { status: true , message: " El carrito esta vacio "}
            }

            let prods = this.readProds(this.pathProds)
            let answer = cartId.productos.map(prod => {
                let item = prods.find(p =>  p.id === prod.id)

                return item ? {
                    "tittle": item.tittle,
                    "thumbnail": item.thumbnail,
                    "description": item.description,
                    "id": item.id,
                    "code": item.code,
                    "price": item.price,
                    "quantity":prod.quantity,
                    "totalPrice": prod.quantity*item.price
                }: {"error": " no encontrado "}
            })
            return { status : true , data:answer}
        }   
        catch(err){
            return { status : false , message: "Hubo un error en obtener el carrito"}
        }
    }
    async addProdsInCart(cartId, prodId){
        try{
            let prods = await this.readProds(this.pathProds)
            let checkProdStock = await prods.findIndex(prod => prod.id === prodId)

            if (prods[checkProdStock].stock === 0){
                return {message: "No se pudo agregar el producto debido a que no hay mas stock"}
            }
            
            prods[checkProdStock].stock--
            await this.writeProds(this.pathProds, prods)
            
            let carts = await this.readProds(this.pathCart)
            let cartIndex = carts.findIndex((cart)=> cart.id === cartId)
            let cart = {...carts[cartIndex]}

            let productoEncontradoIndex = carritoAModificar.products.findIndex(prod => prod.id === pid)

            if (productoEncontradoIndex !== -1) {
                carritoAModificar.products[productoEncontradoIndex].quantity++
            } else {
                carritoAModificar.products.push({ "id": prodId, "quantity": 1 })
            }

            carts[cartIndex] = cart

            this.writeProds(this.pathCart,carts)

            return {status: true , data: carts}
        }
        catch(err){
            return console.error("error al agregar productos", err)
        }
    }

    
}