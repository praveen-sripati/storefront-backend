import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('========= Dashboard Endpoint Testing =========', () => {
  describe('/products-in-orders endpoint testing', () => {
    it('gets the /products-in-orders endpoint status to 200', async () => {
      const response = await request.get('/products-in-orders');
      expect(response.status).toBe(200);
    });
    it('gets the /products-in-orders endpoint response to be an array', async () => {
      const response = await request.get('/products-in-orders');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('/five-most-expensive endpoint testing', () => {
    it('gets the /five-most-expensive endpoint status to 200', async () => {
      const response = await request.get('/five-most-expensive');
      expect(response.status).toBe(200);
    });
    it('gets the /five-most-expensive endpoint response to be an array', async () => {
      const response = await request.get('/five-most-expensive');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('/users-with-orders endpoint testing', () => {
    it('gets the /users-with-orders endpoint status to 200', async () => {
      const response = await request.get('/users-with-orders');
      expect(response.status).toBe(200);
    });
    it('gets the /users-with-orders endpoint response to be an array', async () => {
      const response = await request.get('/users-with-orders');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('/completed-orders-of-user endpoint testing', () => {
    it('gets the /completed-orders-of-user endpoint status to 200', async () => {
      const response = await request.post('/completed-orders-of-user');
      expect(response.status).toBe(200);
    });
    it('gets the /completed-orders-of-user endpoint response to be an array', async () => {
      const response = await request.post('/completed-orders-of-user');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('/current-order-of-user endpoint testing', () => {
    it('gets the /current-order-of-user endpoint status to 200', async () => {
      const response = await request.post('/current-order-of-user');
      expect(response.status).toBe(200);
    });
    it('gets the /current-order-of-user endpoint response to be an array', async () => {
      const response = await request.post('/current-order-of-user');
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});
