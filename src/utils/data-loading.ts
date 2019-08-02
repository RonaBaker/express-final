import { createHttpClient } from './http-client';
import { Product, Category } from '../models';

let products: Product[] = [];
let categories: Category[] = [];

export async function loadData(port: number) {
    const client = createHttpClient(`http://localhost:${port}`);
    products = await client.get('/static/products.json');
    categories = await client.get('/static/categories.json');
}

export {products, categories};
