import express, { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.params.username;
    const user = await store.show(username);
    res.json(user);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
    };
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    };
    const authenticatedUser = await store.authenticate(user.username, user.password);
    if (authenticatedUser) {
      const token = jwt.sign({ user: authenticatedUser }, process.env.TOKEN_SECRET as string);
      res.json(token);
    } else {
      res.status(401);
      res.json(`Unable to find the user with username: ${user.username}`);
    }
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await store.delete(req.body.id);
    res.json(deletedUser);
  } catch (error) {
    throw new Error(`Unable to delete user of id-${req.body.id}: ${error}`);
  }
};

export const user_routes = (
  app: express.Application,
  verifyAuthToken: (req: Request, res: Response, next: NextFunction) => void,
): void => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:username', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/user/authenticate', authenticate);
  app.delete('/users', destroy);
};
