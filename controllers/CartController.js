export const getCart = (req, res) => {
    res.render("Cart.ejs", {
      data: {
        id: "",
        qty: "",
      },
    });
}

