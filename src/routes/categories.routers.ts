import { Router } from 'express';
import * as CategoriesController from '../controllers/categories.controller';
import { checkIdLength } from '../middleware/validations';
import { findCategoryIndex } from '../controllers/categories.controller';
import { findElementIndex } from '../controllers/items.controller';

export const categoryRouter = Router();

categoryRouter.get('/categories', CategoriesController.getCategories);

categoryRouter.get('/categories/:id/products', checkIdLength, CategoriesController.getProductsByCategory);

categoryRouter.get('/categories/:id', checkIdLength, CategoriesController.getById);

categoryRouter.post('/categories', CategoriesController.add);

categoryRouter.put('/categories/:id',  checkIdLength, findCategoryIndex, findElementIndex, CategoriesController.update);

categoryRouter.delete('/categories/:id',
checkIdLength, findCategoryIndex, findElementIndex, CategoriesController.remove);
