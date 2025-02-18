import * as bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// import authenticate from '../middlewares/authenticate.middleware';
import constants from '@constant/applications';
import indexRoute from '@routes/index.routes';
import { errorHandler, notFoundErrorHandler } from '@middlewares/api_error_handler_middleware';

const app = express();

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:4000', 'http://127.0.0.1:5500'];
  const origin = req.get('origin');

  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  } else {
    res.status(403).json({ message: 'CORS error: Origin not allowed' });
  }
});

console.log('APP BERJALAN')
const corsOption = {
  // origin: [process.env.FRONTEND_BASE_URL],
  origin: ['http://127.0.0.1:5500'],
  methods: 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
  credentials: true,
}
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(authenticate);

// // Router
app.use(constants.url.basePath, indexRoute);

// // Error Handler
app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;