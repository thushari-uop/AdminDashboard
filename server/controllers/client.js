import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (Product) => {
                //find product stat using perticular productId
                const stat = await ProductStat.find({ productId: products._id})
                return{
                    //return object of product information with combining stat
                    ...products._doc,
                    stat,
                };
            })
        );

        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({message: error.message});
    } 
}