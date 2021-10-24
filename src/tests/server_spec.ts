import { app, port } from '../server';
import supertest from 'supertest';

const request = supertest(app);

describe('========= Server Endpoint Testing =========', () => {
  describe('-------- Port Number Validation --------', () => {
    it('should be port 3000', () => {
      expect(port).toEqual(3000);
    });
  });

  describe('-------- server.ts endpoint testing --------', () => {
    it('gets the /root endpoint status to 200', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
    it("gets the /root endpoint response to be 'Storefront backend!'", async () => {
      const response = await request.get('/');
      expect(response.text).toEqual('Storefront backend!');
    });
  });
});
