import { Request, Response, NextFunction, Router } from 'express';
import uuidv1 from 'uuid/v1';
import { products } from '../utils/data-loading';
import { Product } from '../models';
import { findProduct } from '../services/products.service';

export function findProductIndex(req: Request, res: Response, next: NextFunction) {
    res.locals.elements = products;
    next();
}

export function getProducts(req: Request, res: Response, next: NextFunction) {
    // tslint:disable-next-line: no-console
    res.send(products);
}

export function getById(req: Request, res: Response, next: NextFunction) {
    findProduct(req.params.id)
    .then((product) => res.send(product))
    .catch(() => {
      res.locals.validationError = 'not_found';
      next(new Error('Product not found'));
    });
}

export function add(req: Request, res: Response, next: NextFunction) {
    const product: Product = req.body;
    product.id = uuidv1();
    products.push(product);
    res.status(201).send(product);
}

export function update(req: Request, res: Response, next: NextFunction) {
    const { elementId, matchingIndex } = res.locals;
    const prod: Product = req.body;
    prod.id = elementId;
    products[matchingIndex] = prod;
    res.send(prod);
}

export function remove(req: Request, res: Response, next: NextFunction) {
    products.splice(res.locals.matchingIndex, 1);
    res.sendStatus(204);
}
