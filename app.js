import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import data from "./models/data.js";

//mongodb data-------------------------------------
import cartItem from "./models/cartItem.js";
//-----------------------------------------------------------------------
//controllersからimportするroutes処理--------------------------------------
import TopRouter from "./routes/TopRouter.js";
import router from "./routes/ProductRouter.js";
//-----------------------------------------------------------------------


const app = express();
dotenv.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./public"));
app.use("/images", express.static("./public/images/"));


app.use(async(req,res,next)=>{
  const cart = await cartItem.find({})
  .then(result => res.locals.cartItem = result)
  .catch(err => console.log(err))
  next();
});

//router ※corsの下に配置--------------------------------------------------
app.use("/", TopRouter);
app.use("/product", router);

//cartページ//

app.get("/cart", (req, res) => {
  res.render("cart.ejs", {
    data: {
      id: "",
      qty: "",
    },
  });
});

app.post("/addCartItem/:id", async (req, res) => {
  const qty = req.query.qty;
  const addedItemId = req.params.id;
  const product = data.products.find((product) => product._id === addedItemId);
  const addedItem = new cartItem({
    productId: product._id,
    name: product.name,
    price: product.price,
    qty: qty,
  });
  const savedItem = await addedItem.save();
  res.render("cart.ejs", {
    data: {
      id: product._id,
      qty: qty,
    },
  });
});

//------------------------------------------------------------------------

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log("Server Running on Port: http://localhost:${PORT}")
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
mongoose.set("useFindAndModify", false);
