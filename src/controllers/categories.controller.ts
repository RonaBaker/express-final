import { Request, Response, NextFunction, Router } from 'express';
import { products, categories } from '../utils/data-loading';
import { Category } from '../models';
import { isProduct } from '../services/products.service';
import uuidv1 from 'uuid/v1';

export function findCategory(id: string): Promise<Category | undefined> {
    const category = categories.find(o => o.id === id);
    if (isProduct(category)) {
      return Promise.resolve(category);
    } else {
      return Promise.reject(category);
    }
}

export function findCategoryIndex(req: Request, res: Response, next: NextFunction) {
    res.locals.elements = categories;
    next();
}

export function getCategories(req: Request, res: Response, next: NextFunction) {
  // tslint:disable-next-line: no-console
  res.send(categories);
}

export function getProductsByCategory(req: Request, res: Response, next: NextFunction) {
    const categoryId = req.params.id;
    const matchingCat = categories.find(o => o.id === categoryId);
    const matchingProd = products.filter(o => o.categoryId === categoryId);
    if (matchingProd.length === 0) { // If length is 0 then check if the category exist; if it is 0, it's ok to send empty array, otherwise 404
      if (!matchingCat) {
        res.locals.validationError = 'not_found';
        next(new Error('Category not found'));
      }
    }
    res.send(matchingProd);
}

export function getById(req: Request, res: Response, next: NextFunction) {
    findCategory(req.params.id)
    .then((category) => res.send(category))
    .catch(() => {
      res.locals.validationError = 'not_found';
      next(new Error('Category not found'));
    });
}

export function add(req: Request, res: Response, next: NextFunction) {
    const category: Category = req.body;
    category.id = uuidv1();
    categories.push(category);
    res.status(201).send(category);
}

export function update(req: Request, res: Response, next: NextFunction) {
    const { elementId, matchingIndex } = res.locals;
    const category: Category = req.body;
    category.id = elementId;
    categories[matchingIndex] = category;
    res.send(category);
}

export function remove(req: Request, res: Response, next: NextFunction) {
    categories.splice(res.locals.matchingIndex, 1);
    res.sendStatus(204);
}
