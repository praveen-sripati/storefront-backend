import { Product, ProductStore } from '../product';

const store = new ProductStore();

describe('========= Product model tests =========', () => {
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
    const product: Product = {
      name: 'something',
      price: 220,
    };
    it('should have a create method', async () => {
      const result = await store.create(product);
      expect(result).toBeDefined;
    });
    it('expects create method to resolve', async () => {
      await expectAsync(store.create(product)).toBeResolved();
    });
    it('expects create method to return the new added product', async () => {
      const result = await store.create(product);
      // @ts-ignore
      expect(result).toEqual({ id: 3, name: 'something', price: '220.00' });
    });
  });

  describe('-------- show() tests --------', () => {
    it('should have a show method', async () => {
      const result = await store.show(3);
      expect(result).toBeDefined;
    });
    it('expects show method to resolve', async () => {
      await expectAsync(store.show(3)).toBeResolved();
    });
  });

  describe('-------- delete() tests --------', () => {
    it('should have a delete method', async () => {
      const result = await store.delete(3);
      expect(result).toBeDefined;
    });
    it('expects delete method to resolve', async () => {
      // @ts-ignore
      await expectAsync(store.delete(2)).toBeResolvedTo({ id: 2, name: 'something', price: '220.00' });
    });
    it('expects delete method to resolves to a deleted product as promise', async () => {
      // @ts-ignore
      await expectAsync(store.delete(1)).toBeResolvedTo({ id: 1, name: 'something', price: '220.00' });
    });
  });
});
