import express, { Request, Response, Application } from 'express';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDb from './config/db';

// dotenv configuration
dotenv.config();

// DB connection
connectDb();

// rest object
const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// route
// URL => http://localhost:8080
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/resturant', require('./routes/resturantRoutes'));
app.use('/api/v1/category', require('./routes/catgeoryRoutes'));
app.use('/api/v1/food', require('./routes/foodRoutes'));

// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<h1>Welcome to Food Server APP API BASE PROJECT </h1>');
});

// PORT
const PORT: number = Number(process.env.PORT) || 5000;

// listen
app.listen(PORT, (): void => {
  console.log(`Server running on ${PORT}`.white.bgMagenta);
});
