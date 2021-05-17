
const Products = require("../models/Products.js");
const p = Products

module.exports = {
    getUserProfile: async (req, res) => {
    res.render("UserProfile.ejs");
    }
}


  