import  {promises as fs}  from 'fs'
export default class ProductManager {
    constructor(){
        this.prods = []
        this.path = "./products.json"
        }

    static id = 0
    async readProds(){
        const data = await fs.readFile(this.path,"utf-8",(err)=>{
            if(err){
                console.log("error en lectura")
            }

        })
        return JSON.parse(data)
    }
    async getProducts(){
        try {
            let prods = await this.readProds()
            return prods
        } catch(err){
            console.log('Error al cargar productos')
        }
    }  
    async addProduct({tittle,description,price,thumbnail,code,stock}){
        if( !tittle && !description && !price && !thumbnail && !code && !stock){
            console.log("FALTAN DATOS")
        }
        if (!this.prods.some((p)=> p.code === code )){
            ProductManager.id++

            let newProd = {tittle,description,price,thumbnail,code,stock,id: ProductManager.id}
            this.prods.push(newProd)
            await fs.writeFile(this.path,JSON.stringify(this.prods),"utf-8")
            console.log('Se agrego correctamente')
        }
        else{
            console.log("Ya se encuentra el producto "+code)
        }
    }
    async deleteProd (id){
        let products = await this.readProds()
        const filtrado = products.filter(prod => prod.id !== id)
        await fs.writeFile(this.path,JSON.stringify(filtrado),"utf-8")
        console.log("Se a eliminado el producto de id "+id)
    }
    async getProductById (id){
        let products = await this.readProds()
        const result =  products.find(prod => prod.id === id )
        if ( result ){
            return result 
        }
        else{
            console.log("No se encontro")
        }
    }
    async updateProduct ({id,...producto}){
        let products = await this.readProds()
        await this.deleteProd(id)
        if (products.find( prod => prod.id === id)){
           let updateProd = [{
            id,...producto
           },
            ...products
        ]       
        await fs.writeFile(this.path,JSON.stringify(updateProd),"utf-8")
        console.log("Se a modificado correctamente")
    }
        else{
            console.log("El producto no existe")
        }
    }
}