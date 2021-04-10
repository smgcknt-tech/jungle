import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
//controllersからimportするroutes処理--------------------------------------
import TopRouter from './routes/TopRouter.js'
//------------------------------------------------------------------------
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config();
app.use(cors());
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));



//router ※corsの下に配置--------------------------------------------------
app.use('/', TopRouter)
//------------------------------------------------------------------------

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log('Server Running on Port: http://localhost:${PORT}')))
  .catch((error) => console.log(`${error} did not connect`));
mongoose.set('useFindAndModify', false);