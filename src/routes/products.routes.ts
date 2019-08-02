import { Router } from 'express';
import * as ProductsController from '../controllers/products.controller';
import {checkIdLength, checkIdAndNameLength, checkNameLength} from '../middleware/validations';
import { findProductIndex } from '../controllers/products.controller';
import { findElementIndex } from '../controllers/items.controller';

export const productRouter = Router();

productRouter.get('/products', ProductsController.getProducts);

productRouter.get('/products/:id', checkIdLength, ProductsController.getById);

productRouter.post('/products', checkNameLength, ProductsController.add);

productRouter.put('/products/:id', checkIdAndNameLength, findProductIndex, findElementIndex, ProductsController.update);

productRouter.delete('/products/:id', checkIdLength, findProductIndex, findElementIndex, ProductsController.remove);
