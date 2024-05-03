import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";

export const getProducts = async(req, res) => {
    try {
        const products = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (product) => {
                //find product stat using perticular productId
                const stat = await ProductStat.find({ 
                    productId: product._id
                })
                return{
                    //return object of product information with combining stat
                    ...product._doc,
                    stat,
                };
            })
        );

        res.status(200).json(productsWithStats);
    } catch (error) {
        res.status(404).json({message: error.message});
    } 
}