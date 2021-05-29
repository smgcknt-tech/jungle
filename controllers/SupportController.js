
const Products = require("../models/Products.js");
const p = Products

module.exports = {
    getSupport: (req, res) => {
    res.render("Support.ejs");
    },
}


  