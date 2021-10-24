import { app } from '../../server';
import supertest from 'supertest';

const request = supertest(app);

describe('========= Users Endpoint Testing =========', () => {
  describe('/users index endpoint testing', () => {
    it('gets the /users index endpoint status to 200', async () => {
      const response = await request.get('/users');
      expect(response.status).toBe(200);
    });
    it('gets the /users endpoint response to be an array', async () => {
      const response = await request.get('/users');
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('/users/:username show endpoint testing', () => {
    it('gets the /users/:username endpoint status to 200', async () => {
      const response = await request.get('/users/something');
      expect(response.status).toBe(200);
    });
    it('gets the /users/:id endpoint response to be an array', async () => {
      const response = await request.get('/users/something');
      expect(response.body).toBeNull();
    });
  });
});
