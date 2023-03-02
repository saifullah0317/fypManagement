import express from 'express'
import mongoose from 'mongoose'
import  bodyParser from 'body-parser'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
const app = express()

const PORT = 8080 
// Middlewares
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }))
app.use(cors());

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
app.use('/',authRoutes)



const CONNECTION_URL =
  "mongodb+srv://Ahsan:AhsanSS123@cluster0.o91lqhr.mongodb.net/?retryWrites=true&w=majority";

  mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`))
  )
  .catch(() => (err) => console.log(err.messsage));

