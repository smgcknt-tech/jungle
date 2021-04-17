const data =require ("../models/schema/data.js");

const TopController ={
    getTop:(req, res) => {
        res.render("Top.ejs", { products: data.products });
    }
}

module.exports =  TopController;