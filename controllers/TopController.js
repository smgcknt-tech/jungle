import listInputs from "../models/ProductData.js";
import data from "../models/data.js";

export const getTop = (req, res) => {
  try {
    res.render(`Top.ejs`,{products:data.products});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
