import ProductManager from "./classes/productManager.js";

const prodManager = new ProductManager()

prodManager.addProduct({
    tittle:"iphone",
    description:"white",
    price:800,
    thumbnail:"",
    code:"ip002",
    stock: 21,
}
)
prodManager.addProduct({
    tittle:"iphone",
    description:"black",
    price:800,
    thumbnail:"",
    code:"ip004",
    stock: 21,
}
)
prodManager.addProduct({
    tittle:"iphone 13 ",
    description:"black",
    price:800,
    thumbnail:"",
    code:"ip007",
    stock: 21,
}
)

prodManager.updateProduct({
    tittle:"iphone 13 ",
    description:"black",
    price:1200,
    thumbnail:"",
    code:"ip007",
    stock: 2,
    id: 1
})
prodManager.deleteProd(2)