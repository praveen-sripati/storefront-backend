import { Order, OrderStore } from '../order';
import { Product, ProductStore } from '../product';

const store = new OrderStore();
const productStore = new ProductStore();

describe('========= Order model tests =========', () => {
  describe('-------- index() tests --------', () => {
    it('should have an index method', async () => {
      const result = await store.index();
      expect(result).toBeDefined;
    });
    it('expects index method to resolve', async () => {
      await expectAsync(store.index()).toBeResolved();
    });
  });

  describe('-------- create() tests --------', () => {
    const order: Order = {
      status: 'active',
      userId: 1,
    };
    it('should have a create method', async () => {
      const result = await store.create(order);
      expect(result).toBeDefined;
    });
    it('expects create method to resolve', async () => {
      await expectAsync(store.create(order)).toBeResolved();
    });
    it('expects create method to return the new added order of user_id 1', async () => {
      const result = await store.create(order);
      // @ts-ignore
      const { status, user_id } = result;
      // @ts-ignore
      expect({ status, user_id }).toEqual({
        status: 'active',
        user_id: '1',
      });
    });
  });

  describe('-------- show() tests --------', () => {
    it('should have a show method', async () => {
      const result = await store.show(1);
      expect(result).toBeDefined;
    });
    it('expects show method to resolve', async () => {
      await expectAsync(store.show(1)).toBeResolved();
    });
    it('expects show method to be rejected', async () => {
      await expectAsync(store.show(4)).toBeResolvedTo(null);
    });
  });

  describe('-------- delete() tests --------', () => {
    it('should have a delete method', async () => {
      const result = await store.delete(1);
      expect(result).toBeDefined;
    });
    it('expects delete method to resolve', async () => {
      await expectAsync(store.delete(2)).toBeResolved();
    });
    it('expects delete method to return the user object', async () => {
      const result = await store.delete(3);
      // @ts-ignore
      const { status, user_id } = result;
      expect({ status, user_id }).toEqual({
        status: 'active',
        user_id: '1',
      });
    });
    it('expects delete method to be resolved to null', async () => {
      await expectAsync(store.delete(1)).toBeResolvedTo(null);
    });
    it('expects delete method to be resolved to null', async () => {
      await expectAsync(store.delete(6)).toBeResolvedTo(null);
    });
    it('expects delete method to be resolved to null', async () => {
      await expectAsync(store.delete(123)).toBeResolvedTo(null);
    });
  });

  describe('-------- addProduct() tests --------', () => {
    it('should have a addProduct method', async () => {
      const order: Order = {
        status: 'active',
        userId: 1,
      };
      const product: Product = {
        name: 'something',
        price: 200,
      };
      await productStore.create(product);
      await store.create(order);
      const result = await store.addProduct(20, 4, 4);
      expect(result).toBeDefined;
    });
    it('expects addProduct method to resolve', async () => {
      const order: Order = {
        status: 'active',
        userId: 2,
      };
      await store.create(order);
      await expectAsync(store.addProduct(20, 4, 4)).toBeResolved();
    });

    it('expects addProduct method to rejected', async () => {
      const order: Order = {
        status: 'completed',
        userId: 3,
      };
      await store.create(order);
      await expectAsync(store.addProduct(20, 6, 4)).toBeRejected();
    });
  });
});
