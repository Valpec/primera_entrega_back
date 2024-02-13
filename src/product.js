class Product{
    constructor(title, description,code,price,status,stock, category,thumbnails, id){
        this.title= String(title)
        this.description = String(description)
        this.code = String(code)
        this.price = Number(price);
        this.status = Boolean(status);
        this.stock = Number(stock);
        this.category = String(category);
        this.thumbnails = String(thumbnails)
        this.id = id
    }
}

export default Product