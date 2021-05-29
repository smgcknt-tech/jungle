//from npm
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");

//from routes
const TopRouter = require("./routes/TopRouter");
const ProductRouter = require("./routes/ProductRouter");
const CartRouter = require("./routes/CartRouter");
const SignInRouter = require("./routes/SignInRouter");
const SignOutRouter = require("./routes/SignOutRouter");
const SignUpRouter = require("./routes/SignUpRouter");
const CheckOutRouter = require("./routes/CheckOutRouter");
const UserProfileRouter = require("./routes/UserProfileRouter");
const UploadRouter = require("./routes/UploadRouter");
const apiRouter = require("./routes/apiRouter");
const adminRouter = require("./routes/adminRouter");
const SupportRouter = require("./routes/SupportRouter");
//from controllers
const MidllewareController = require("./controllers/MiddlewareController");
//from public
const utils = require("./public/javascripts/utils");
//general setting
dotenv.config();
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
app.set("views", __dirname + "/views/pages");
app.set("view engines", "ejs");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "my_secret_key", resave: false, saveUninitialized: false })
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use([MidllewareController.loginCheck, MidllewareController.errorCatcher]);
//router ※middlewareより下に配置
app.use("/", TopRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);
app.use("/signIn", SignInRouter);
app.use("/signOut", SignOutRouter);
app.use("/signUp", SignUpRouter);
app.use("/checkOut", CheckOutRouter);
app.use("/UserProfile", UserProfileRouter);
app.use("/upload", UploadRouter);
app.use("/api", apiRouter);
app.use("/admin", adminRouter);
app.use("/support", SupportRouter);
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
    server.listen(PORT, () => {
      console.log(`Server Running on Port: http://localhost:${PORT}`);
    });

    const botName = "ターザン";

    io.on("connection", (socket) => {
      socket.on("joinRoom", ({ username, room }) => {
        const user = utils.userJoin(socket.id, username, room);
        socket.join(user.room);
        socket.emit(
          "message",
          utils.formatMessage(
            botName,
            `あなたのアシスタントの${botName}です。どういたしましたか？`
          )
        );
      });
      socket.on("chatMessage", (msg) => {
        const user = utils.getCurrentUser(socket.id);
        io.to(user.room).emit("message", utils.formatMessage(user.username, msg));
        socket.emit(
          "message",
          utils.formatMessage(
            botName,
            `回答が見つかりませんでした。大変申し訳ございませんが、こちらの電話窓口までおかけ直しください。000-0000-0000(現在機能改修中)`
          )
        )
      });
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
