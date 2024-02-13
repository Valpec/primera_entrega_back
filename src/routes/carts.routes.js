import { Router } from 'express';
import CartManager from '../CartManager.js';


let cartManager = new CartManager()
const router = Router();

router.post('/', async(req, res) => {
    try{
        await cartManager.createCart()
        res.status(201).send({message: "Cart creado con exito"});
    }catch(error){
        res.status(500).send({error: "500", message: "No se pudo crear el carrito"});
    }
    
})

router.get('/:cid', async(req,res) => {
    try{
        let cid = parseInt(req.params.cid)
        res.send(await cartManager.listCartProds(cid))
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
    
})

router.post('/:cid/product/:pid', async(req,res) => {
    try{
        let cid = parseInt(req.params.cid)
        let pid = parseInt(req.params.pid)
        await cartManager.addToCart(cid, pid)
        res.status(201).send({message: "Producto agregado con exito"});
    } catch(error){
        res.status(400).send({error: "400", message: "El id es invalido o no existe"});
    }
    
})
export default router;
