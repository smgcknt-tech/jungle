//from npm
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const moment = require("moment");

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
const UserProfileRouter = require("./routes/UserProfileRouter");
const UploadRouter = require("./routes/UploadRouter");
const apiRouter = require("./routes/apiRouter");
const adminRouter = require("./routes/adminRouter");
const SupportRouter = require("./routes/SupportRouter");
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


    const users = [];
    const botName = 'ChatCord Bot';

    //chat
    function formatMessage(username, text) {
      return {
        username,
        text,
        time: moment().format("h:mm a"),
      };
    }

    // Join user to chat
    function userJoin(id, username, room) {
      const user = { id, username, room };

      users.push(user);

      return user;
    }

    // Get current user
    function getCurrentUser(id) {
      return users.find((user) => user.id === id);
    }

    // User leaves chat
    function userLeave(id) {
      const index = users.findIndex((user) => user.id === id);

      if (index !== -1) {
        return users.splice(index, 1)[0];
      }
    }

    // Get room users
    function getRoomUsers(room) {
      return users.filter((user) => user.room === room);
    }


    // Run when client connects
    io.on('connection', socket => {
      socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
    
        socket.join(user.room);
    
        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
    
        // Broadcast when a user connects
        socket.broadcast
          .to(user.room)
          .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`)
          );
    
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      });
    
      // Listen for chatMessage
      socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
    
        io.to(user.room).emit('message', formatMessage(user.username, msg));
      });
    
      // Runs when client disconnects
      socket.on('disconnect', () => {
        const user = userLeave(socket.id);
    
        if (user) {
          io.to(user.room).emit(
            'message',
            formatMessage(botName, `${user.username} has left the chat`)
          );
    
          // Send users and room info
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
          });
        }
      });
    })
  })
  .catch((error) => console.log(`${error} did not connect`));
