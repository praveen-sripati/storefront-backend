import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
    return;
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    throw new Error(`Unable to add product: ${error}`);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await store.delete(req.body.id);
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(`Unable to delete product of id-${req.body.id}: ${error}`);
  }
};

const products_routes = (app: express.Application): void => {
  app.get('/products', index);
  app.post('/products', create);
  app.delete('/products', destroy);
};

export default products_routes;
