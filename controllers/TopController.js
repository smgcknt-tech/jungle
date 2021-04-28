const Product = require("../models/ProductModel");

module.exports = {
    getTop: async (req, res) => {
    const allProducts = await Product.find({});
    res.render("Top.ejs", {products:allProducts});
    }
}
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
})
