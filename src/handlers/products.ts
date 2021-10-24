import express, { NextFunction, Request, Response } from 'express';
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

const show = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const product = await store.show(id);
    res.json(product);
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

const products_routes = (
  app: express.Application,
  verifyAuthToken: (req: Request, res: Response, next: NextFunction) => void,
): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products', verifyAuthToken, destroy);
};

export default products_routes;
