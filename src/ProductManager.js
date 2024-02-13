import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

class ProductManager {
    constructor() {
        const __dirname = path.dirname(fileURLToPath(import.meta.url))

        this.products = [];
        this.path = path.resolve(__dirname, "files", "productos.json")

        this.fs = fs
    }

    generateId = async (existingProducts) => {
        let id
        do {
            id = Math.floor(Math.random() * 100000);
        } while (existingProducts.find((prod) => prod.id == id))
        return id;
    }

    addProduct = async (producto) => {
        let existingProducts = await this.getProducts()

            if (!Object.values(producto).includes(undefined) &&
                !existingProducts.some((prod) => (prod.code === producto.code))) {
    
                let prodId = await this.generateId(existingProducts)
                this.products.push(...existingProducts, { ...producto, id: prodId })
    
                try {
                    await this.fs.promises.writeFile(
                        this.path,
                        JSON.stringify(this.products, null, 2, '\t')
                    );
                }
                catch (error) {
                    console.error(`Error escribiendo el archivo: ${error}`);
                }
            }else{
                throw new Error("Codigo repetido o campos vacios")
            }
        
    }


    getProducts = async () => {

        try {
            let productosFileStr = await this.fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(productosFileStr)
        } catch (error) {
            console.error(`Error leyendo el archivo: ${error}`);
        }

    }

    getProductsById = async (itemId) => {
        let respuesta = await this.getProducts()
        let busquedaPorId = respuesta.find((prod) => (prod.id === itemId))
        console.log(`Busqueda por ID: ${itemId}`)
        if (busquedaPorId === undefined) {
            console.log("Not Found")
        }
        else {
            return (busquedaPorId)
        }
    }

    updateProduct = async (pid, productoRecibido) => {

        let array = await this.getProducts()
        let indiceProd = array.findIndex((prod) => (prod.id === pid))
        try {
            if (indiceProd > -1) {
                array.splice(indiceProd, 1, { ...productoRecibido, id: pid })
                await this.fs.promises.writeFile(this.path, JSON.stringify(array, null, 2, '\t'))
            } else {
                console.log("Not Found")
            }
        } catch (error) {
            console.error(`Error escribiendo el archivo: ${error}`);
        }
    }


    deleteProduct = async (itemId) => {
        let array = await this.getProducts()
        let indiceProd = array.findIndex((prod) => (prod.id === itemId))
        try {
            if (indiceProd > -1) {
                array.splice(indiceProd, 1)
                await this.fs.promises.writeFile(this.path, JSON.stringify(array, null, 2, '\t'))
            } else {
                console.log('Not Found')
            }
        } catch (error) {
            console.log(`Error escribiendo el archivo: ${error}`);
        }
    }

}


export default ProductManager;