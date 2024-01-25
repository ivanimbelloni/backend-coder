import  {existsSync, promises as fs}  from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default class ProductManager {
    constructor(){
        this.path = join(__dirname, "../data/products.json")
        this.prodsExists()
        }
    static id = 0
    async readProds(path){
        try{
            return JSON.parse(await fs.readFile(path,"utf-8"))
        }
       catch(err){
            console.error("error en la lectura", err)
       }     
    }
    async prodsExists(){
        try{
            const exists = existsSync(this.path)
            if(!exists){
                await fs.writeFile(this.path,'[]','utf-8')
                console.log(`se a creado el archivo en ${this.path}`)
            }
        }
        catch(err){
            console.error('no se pudo crear el archivo',err)
        }
        }


    async writeProducts(path,data){
        try{
            await fs.writeFile(path, JSON.stringify(data), 'utf-8')
        } catch (error){
            console.error("error en la escritura de archivo", error)
        }
    }

    async addProduct({tittle,description,price,thumbnail,code,stock}){
        try{
            let products = await this.readProds(this.path)
            if( !tittle && !description && !price && !thumbnail && !code && !stock ){
                console.log("FALTAN DATOS")
            }
            if (!products.some((p)=> p.code === code )){    

                ProductManager.id++
                let newProd =  {tittle,description,price,thumbnail,code,stock,id: ProductManager.id, status: true }
                products.push(newProd)
                await this.writeProducts(this.path,products)
                return { data: newProd, message:" Se a agregado correctamente", status:newProd.status}
        }
            else{
                return{message:`El producto ${code} ya se encuentra ` }
        }
        }
        catch(err){
            return {message:"no se a podido agregar el producto", error: err}
        }
    }
    async deleteProd (id){
        try{
            let products = await this.readProds(this.path)
            let prodExists = await this.getProductById(id)
            if (prodExists){
                let productsFilter = products.filter((prod) => prod.id !== id)
                await this.writeProducts(this.path,productsFilter)
                return { status: true, message:`Se a borrado el producto del id ${id}`}
            } 
           
        }
        catch(err){
            return { message : " No se pudo borrar el producto ", status: false, error:err  }
        }
    }
    async getProductById (id){
        try{
            let products = await this.readProds(this.path)
            let prodId = products.find((prod)=> prod.id === id)
            if(prodId){
                return {data:prodId }
            }else{
                return {message:"El id no corresponde "}
            }
        }
        catch(err){
            console.error("Hubo un error en obtener el producto",err)
        }
    }
    async updateProduct ({id,...producto}){
        try{
            let products = await this.readProds(this.path)
            await this.deleteProd(id)
            if (products.find( prod => prod.id === id)){
                let updateProd = [{
                    id,...producto
                },
                ...products
            ]       
            await this.writeProducts(this.path,updateProd)
                return {status: true ,data: updateProd, message:`El producto ${id} se a modificado correctamente `}
            }
            else{
                return { message:`El producto ${id} no existe `}
            }
        }
        catch (err){
            return {error: " No se pudo actualizar el producto"}
        }
    }
}