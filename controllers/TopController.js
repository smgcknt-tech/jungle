import listInputs from "../models/ProductData.js";

export const getTop = (req, res) => {
  try {
    res.render(`Top.ejs`);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
