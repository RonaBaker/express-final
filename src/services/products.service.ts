import { Product } from '../models';
import { products } from '../utils/data-loading';

export function isProduct(object: any): object is Product {
  return object !== undefined;
}

export function findProduct(id: string): Promise<Product | undefined> {
  const product = products.find(o => o.id === id);
  if (isProduct(product)) {
    return Promise.resolve(product);
  } else {
    return Promise.reject(product);
  }
}
