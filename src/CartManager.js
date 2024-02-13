import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

class CartManager {
    constructor() {
        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        this.carts = [];
        this.path = path.resolve(__dirname, "files", "carritos.json")
        this.fs = fs
    }

    generateId = async (existingCarts) => {
        let id
        do{
            id = Math.floor(Math.random() * 100000);
        }while(existingCarts.find((cart)=> cart.id == id))
        return id;
    }

    createCart = async () => {
        let existingCarts = await this.readCartFile()
        let cartId = await this.generateId(existingCarts)
        let newCart = {id:cartId, products:[]}
        this.carts.push(...existingCarts, newCart)
        try{
            await this.fs.promises.writeFile(
                this.path,
                JSON.stringify(this.carts, null, 2, '\t')
            );
        }
        catch (error) {
            console.error(`Error escribiendo el archivo: ${error}`);
        }

    }

    readCartFile = async()=>{
        try{
            let cartsFromFile = await this.fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(cartsFromFile)
        } catch (error){
            console.error(`Error leyendo el archivo: ${error}`);

        }
        }
        

    listCartProds = async(cid)=>{

        let cartsFromFile = await this.readCartFile()
        let cart = cartsFromFile.find((c) => c.id === cid)
        if(cart){
            console.log('cart found')
            return cart.products

        }else{
            console.log('cart not found')
        }
        
    }

    addToCart = async(cid, pid) =>{
        let cartsFromFile = await this.readCartFile()
        // si no existe, error de que no existe
        let cart = cartsFromFile.find((c) => c.id === cid)
        let productFromCart = cart.products.find((prod)=> prod.product === pid)
        if (productFromCart){
            productFromCart.quantity ++
        }else{
            cart.products.push({product: pid, quantity: 1})
        }
        try{
            await this.fs.promises.writeFile(
                this.path,
                JSON.stringify(cartsFromFile, null, 2, '\t'))
        } catch(error) {
            console.error(`Error escribiendo el archivo: ${error}`);
            
        }
        
    }

}
export default CartManager