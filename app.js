//=require npm---------------------------------------------------------------
const express =require ("express");
const mongoose =require ("mongoose");
const cors =require ("cors");
const dotenv =require ("dotenv");
//=require controllers-------------------------------------------------------
const MidllewareController =require ("./controllers/MiddlewareController.js");
//-----------------------------------------------------------------------
//=require models------------------------------------------------------------

//-----------------------------------------------------------------------
//=require routes------------------------------------------------------------
const TopRouter =require ("./routes/TopRouter.js");
const ProductRouter =require ("./routes/ProductRouter.js");
const CartRouter  =require ("./routes/CartRouter.js");
//-----------------------------------------------------------------------
//setting----------------------------------------------------------------
const app = express();
dotenv.config();
app.set('views', './views/pages');
app.set('view engines','ejs');
//middleware-------------------------------------------------------------
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use([
  MidllewareController.dataPassing,
  MidllewareController.errorCatcher,
]);
//router ※corsの下に配置---------------------------------------------------
app.use("/", TopRouter);
app.use("/product", ProductRouter);
app.use("/cart",CartRouter);
//-----------------------------------------------------------------------
//mongoDB接続-------------------------------------------------------------
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log("Server Running on Port: http://localhost:${PORT}")
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
//------------------------------------------------------------------------
