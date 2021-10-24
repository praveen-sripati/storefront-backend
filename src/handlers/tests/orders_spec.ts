import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('========= Orders Endpoint Testing =========', () => {
  describe('/orders index endpoint testing', () => {
    it('gets the /orders index endpoint status to 200', async () => {
      const response = await request.get('/orders');
      expect(response.status).toBe(200);
    });
    it('gets the /orders endpoint response to be an array', async () => {
      const response = await request.get('/orders');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('/orders/:id show endpoint testing', () => {
    it('gets the /orders/:id endpoint status to 200', async () => {
      const response = await request.get('/orders/1');
      expect(response.status).toBe(200);
    });
    it('gets the /orders/:id endpoint response to be an array', async () => {
      const response = await request.get('/orders/1');
      expect(response.body).toBeNull();
    });
  });
});
