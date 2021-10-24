import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('========= Products Endpoint Testing =========', () => {
  describe('/products index endpoint testing', () => {
    it('gets the /products index endpoint status to 200', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });
    it('gets the /orders endpoint response to be an array', async () => {
      const response = await request.get('/products');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('/products/:id show endpoint testing', () => {
    it('gets the /products/:id endpoint status to 200', async () => {
      const response = await request.get('/orders/1');
      expect(response.status).toBe(200);
    });
    it('gets the /orders/:id endpoint response to be an array', async () => {
      const response = await request.get('/orders/1');
      expect(response.body).toBeNull();
    });
  });
});
