import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import products_routes from './handlers/products';
import { user_routes } from './handlers/users';
import dotenv from 'dotenv';
import order_routes from './handlers/orders';
import dashboardRoutes from './handlers/dashboard';

dotenv.config();

const app: express.Application = express();
const port = 3000;
const address = `0.0.0.0:${port}`;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader ? authorizationHeader.split(' ')[1] : null;
    if (typeof token === 'string') {
      // eslint-disable-next-line
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    }
    next();
  } catch (error) {
    res.status(401);
    res.send('unable to authorize!');
  }
};

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('Storefront backend!');
});

products_routes(app, verifyAuthToken);
user_routes(app, verifyAuthToken);
order_routes(app, verifyAuthToken);
dashboardRoutes(app, verifyAuthToken);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export { app, port };
