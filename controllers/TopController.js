const Products = require("../models/Products.js");
const p = Products

module.exports = {
    getTop: async (req, res) => {
    const allProducts = await p.product.findAll();
    res.render("Top.ejs", {products:allProducts});
    }
}
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
})

//error-catcher
process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  });
  