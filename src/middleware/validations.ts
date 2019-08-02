import { Request, Response, NextFunction, Router } from 'express';
import { Product } from '../models';
import joi from 'joi';
import { schema } from '../validations/product';

export function checkIdLength(req: Request, res: Response, next: NextFunction) {
    const { error } = joi.validate({ id: req.params.id } as Product, schema);
    if (error) {
        next(new Error(error.message));
    }
    next();
}

export function checkIdAndNameLength(req: Request, res: Response, next: NextFunction) {
    const { error } = joi.validate({ id: req.params.id, name: req.body.name } as Product,
        schema, { abortEarly: false });
    if (error) {
        next(new Error(error.message));
    }
    next();
}

export function checkNameLength(req: Request, res: Response, next: NextFunction) {
    const { error } = joi.validate({ name: req.body.name } as Product,
        schema, { abortEarly: false });
    if (error) {
        next(new Error(error.message));
    }
    next();
}
