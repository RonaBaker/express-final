import { Request, Response, NextFunction, Router } from 'express';

export function findElementIndex(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const matchingIndex = res.locals.elements.findIndex((o: typeof res.locals.elements) => o.id === id);
    if (matchingIndex < 0) {
      res.locals.validationError = 'not_found';
      next(new Error('Not Found'));
    }
    res.locals.matchingIndex = matchingIndex;
    res.locals.elementId = id;
    next();
}
