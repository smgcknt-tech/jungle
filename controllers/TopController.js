const Product = require("../models/schemas/ProductModel.js");

const TopController ={
    getTop: async(req, res) => {
        const allProducts = await Product.find({});
        res.render("Top.ejs", { products: allProducts});
    }
}

module.exports =  TopController;