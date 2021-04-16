import data from "../models/data.js";

export const getTop = (req, res) => {
    res.render("Top.ejs", {products:data.products});
};
