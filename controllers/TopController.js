const Products = require("../models/Products.js");

module.exports = {
    getTop: async (req, res) => {
    const allProducts = await Products.top.getAllProducts();
    res.render("Top.ejs", {products:allProducts});
    }
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
})
