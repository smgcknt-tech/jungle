//from npm
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
//from controllers
const MidllewareController = require("./controllers/MiddlewareController.js");
//from routes
const TopRouter = require("./routes/TopRouter.js");
const ProductRouter = require("./routes/ProductRouter.js");
const CartRouter = require("./routes/CartRouter.js");
const SignInRouter = require("./routes/SignInRouter.js");
//general setting
const app = express();
dotenv.config();
app.set("views", "./views/pages");
app.set("view engines", "ejs");
//all-time middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "my_secret_key", resave: false, saveUninitialized: false }));
app.use(express.static("public"));
app.use([
  MidllewareController.dataPassing, 
  MidllewareController.errorCatcher
]);
//router ※corsより下に配置
app.use("/", TopRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);
app.use("/signIn", SignInRouter);
//mongoDB接続情報
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log("Server Running on Port: http://localhost:${PORT}")
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
