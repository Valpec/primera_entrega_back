import express from 'express';
import cartsRoutes from "./src/routes/carts.routes.js"
import productsRoutes from "./src/routes/products.routes.js"

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//puntos de entrada para routes
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)


app.listen(PORT, ()=>{
    console.log(`Server run on port: ${PORT}`)
})

