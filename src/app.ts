import express from 'express';
import cors from 'cors';
import { categoryRouter } from './routes/categories.routers';
import { productRouter } from './routes/products.routes';
import { errorHandler } from './middleware/errors';
import path from 'path';
import { initConfig } from './utils/config';

initConfig();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/api', productRouter);
app.use('/api', categoryRouter);

app.use(errorHandler);

export {app};
