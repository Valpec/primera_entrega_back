import ProductManager from '../ProductManager.js';
import { Router } from 'express';
const router = Router();

let productManager = new ProductManager()


router.get('/', async (req, res) => {
    try {
        let { limit } = req.query;
        let prods = await productManager.getProducts()
        if (limit) {
            res.send(prods.slice(0, (parseInt(limit))))
        } else {
            res.send(prods)
        }
    } catch (error) {
        console.error(`Error processing request: ${error}`)
        res.status(500).send({ error: "500", message: "Error consultando los productos" })
    }

})

router.get('/:pid', async (req, res) => {

    let prod = await productManager.getProductsById((parseInt(req.params.pid)))
    if (prod) {
        res.send(prod)
    } else {
        res.status(400).send({ error: "400", message: "El id es invalido o no existe." });
    }

})

router.post('/', async (req, res) => {
    try{
        let prod = req.body
        await productManager.addProduct(prod)
        res.status(201).send({message: "Producto agregado con exito"});
    }catch(error){
        res.status(400).send({ error: "400", message:`Error: ${error}` })
    }
})


router.put('/:pid', (req, res) => {
    try {
        let pid = parseInt(req.params.pid)
        let prod = req.body
        productManager.updateProduct(pid, prod)
        res.status(201).send({ message: "Producto actualizado con exito" });

    } catch (error) {
        res.status(400).send({ error: "400", message: "El id es invalido o no existe." });
    }

})

router.delete('/:pid', (req, res) => {
    try {
        let pid = parseInt(req.params.pid)
        productManager.deleteProduct(pid)
        res.status(200).send({ message: "Producto eliminado con exito" });
    } catch (error) {
        res.status(400).send({ error: "400", message: "El id es invalido o no existe." });
    }

})
export default router