const data =require ("../models/schemas/Data.js");

const TopController ={
    getTop:(req, res) => {
        res.render("Top.ejs", { products: data.products });
    }
}

module.exports =  TopController;