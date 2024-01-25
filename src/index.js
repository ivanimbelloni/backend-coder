import ProductManager from "./classes/productManager.js";



const prodManager = new ProductManager()

const prod1 = await prodManager.addProduct({
    tittle:"iphone",
    description:"white",
    price:800,
    thumbnail:"",
    code:"ip002",
    stock: 21,
}
)
const prod2 = await prodManager.addProduct({
    tittle:"iphone",
    description:"black",
    price:800,
    thumbnail:"",
    code:"ip004",
    stock: 21,
}
)
const prod3 = await prodManager.addProduct({
    tittle:"iphone 13 ",
    description:"black",
    price:800,
    thumbnail:"",
    code:"ip007",
    stock: 21,
}
)


