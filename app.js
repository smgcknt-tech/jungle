//from npm
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
//from controllers
const MidllewareController = require("./controllers/MiddlewareController");
//from routes
const TopRouter = require("./routes/TopRouter");
const ProductRouter = require("./routes/ProductRouter");
const CartRouter = require("./routes/CartRouter");
const SignInRouter = require("./routes/SignInRouter");
const SignOutRouter = require("./routes/SignOutRouter");
const SignUpRouter = require("./routes/SignUpRouter");
const CheckOutRouter = require("./routes/CheckOutRouter");
//general setting
const app = express();
dotenv.config();
app.set("views", "./views/pages");
app.set("view engines", "ejs");
//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(session({ secret: "my_secret_key", resave: false, saveUninitialized: false }));
app.use(express.static("public"));
app.use([
  MidllewareController.loginCheck, 
  MidllewareController.errorCatcher,
]);
//router ※middlewareより下に配置
app.use("/", TopRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);
app.use("/signIn", SignInRouter);
app.use("/signOut", SignOutRouter);
app.use("/signUp", SignUpRouter);
app.use("/checkOut", CheckOutRouter);
//db-connection
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
