import  express  from 'express';
import {connect} from './db.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import {router as authRouter} from './routes/authRoute.js'
import { parkingRouter } from './routes/productRoute.js';
import { cityRouter } from './routes/cityRoute.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import morgan from 'morgan';
import { bookingRouter } from './routes/bookingRoute.js';
import { vendorRoute } from './routes/vendorRoutes.js';
import { adminRoute } from './routes/adminRoute.js';
import { vehicleRouter } from './routes/vehicleRouter.js';
import { parkingRoute } from './routes/parkingDetailRoute.js';
const app = express();

const port = process.env.PORT 


// const corsOptions = {
//   origin: 'https://parkeme.netlify.app',
// };

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());
app.use(morgan("dev"));

connect();


app.use("/api/user", authRouter);


app.use("/api/vehicle", vehicleRouter);
app.use("/api/parking", parkingRouter);
app.use("/api/city", cityRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRoute);
app.use("/v1/api/vendor",vendorRoute);
app.use('/v1/api/parking', parkingRoute);




// app.use(notFound);
// app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({message: 'Hello, home!'});
});
app.get('/hello', (req, res) => {
  res.json({message: 'Hello, Express!'});
});
app.get('/hello2', (req, res) => {
    res.send('Hello2, Express!');
  });


app.listen( port , () => {
  console.log(`Server is running on http://localhost:${port}`);
});
