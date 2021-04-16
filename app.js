import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
//from controllers-------------------------------------------------------
import { dataPassing } from "./controllers/Middleware.js";
//-----------------------------------------------------------------------
//from models------------------------------------------------------------

//-----------------------------------------------------------------------
//from routes------------------------------------------------------------
import TopRouter from "./routes/TopRouter.js";
import ProductRouter from "./routes/ProductRouter.js";
import CartRouter  from "./routes/CartRouter.js";
//-----------------------------------------------------------------------
const app = express();
dotenv.config();
app.set('view engines','ejs');
const __dirname = path.dirname(new URL(import.meta.url).pathname);
//middleware-------------------------------------------------------------
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(dataPassing);
//router ※corsの下に配置-------------------------------------------------
app.use("/", TopRouter);
app.use("/product", ProductRouter);
app.use("/cart",CartRouter);
//-----------------------------------------------------------------------
//mongoDB接続-----------------------------------------------------------------
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
//------------------------------------------------------------------------
