import express, { NextFunction, Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
  const users = await dashboard.fiveMostExpensive();
  res.json(users);
};

const usersWithOrders = async (_req: Request, res: Response) => {
  const users = await dashboard.usersWithOrders();
  res.json(users);
};

const completedOrders = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const completeOrdersOfUsers = await dashboard.completedOrders(userId);
  res.json(completeOrdersOfUsers);
};

const activeOrder = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const activeOrderOfUser = await dashboard.activeOrder(userId);
  res.json(activeOrderOfUser);
};

const dashboardRoutes = (
  app: express.Application,
  verifyAuthToken: (req: Request, res: Response, next: NextFunction) => void,
) => {
  app.get('/products-in-orders', productsInOrders);
  app.get('/five-most-expensive', fiveMostExpensive);
  app.get('/users-with-orders', usersWithOrders);
  app.post('/completed-orders-of-user', verifyAuthToken, completedOrders);
  app.post('/current-order-of-user', verifyAuthToken, activeOrder);
};

export default dashboardRoutes;
