import express, { NextFunction, Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (error) {
    res.status(400);
    res.json(error);
    return;
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  try {
    const order = await store.show(id);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
    return;
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      status: req.body.status,
      userId: req.body.userId,
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    throw new Error(`Unable to add order: ${error}`);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedOrder = await store.delete(req.body.id);
    res.json(deletedOrder);
  } catch (error) {
    throw new Error(`Unable to delete order of id-${req.body.id}: ${error}`);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId = parseInt(req.params.id);
  const productId = parseInt(req.body.productId);
  const quantity: number = parseInt(req.body.quantity);
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const order_routes = (
  app: express.Application,
  verifyAuthToken: (req: Request, res: Response, next: NextFunction) => void,
): void => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', verifyAuthToken, create);
  app.delete('/orders', verifyAuthToken, destroy);
  // add product
  app.post('/orders/:id/products', addProduct);
};

export default order_routes;
