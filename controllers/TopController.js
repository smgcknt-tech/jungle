import data from "../models/data.js";
import cartItem from "../models/cartItem.js";

export const getTop = (req, res) => {
    res.render("Top.ejs", {products:data.products});
};
