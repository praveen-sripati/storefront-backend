import { User, UserStore } from '../user';

const store = new UserStore();

describe('========= User model tests =========', () => {
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
    const user: User = {
      firstName: 'something',
      lastName: 'something',
      username: 'something',
      password: 'something',
    };
    it('should have a create method', async () => {
      const result = await store.create(user);
      expect(result).toBeDefined;
    });
    it('expects create method to resolve', async () => {
      await expectAsync(store.create(user)).toBeResolved();
    });
    it('expects create method to return the new added user', async () => {
      const result = await store.create(user);
      // @ts-ignore
      const { first_name, last_name, user_name } = result;
      // @ts-ignore
      expect({ first_name, last_name, user_name }).toEqual({
        first_name: 'something',
        last_name: 'something',
        user_name: 'something',
      });
    });
  });

  describe('-------- show() tests --------', () => {
    it('should have a show method', async () => {
      const result = await store.show('something');
      expect(result).toBeDefined;
    });
    it('expects show method to resolve', async () => {
      await expectAsync(store.show('something')).toBeResolved();
    });
    it('expects show method to be resolved to null', async () => {
      await expectAsync(store.show('sdf')).toBeResolvedTo(null);
    });
  });

  describe('-------- authenticate() tests --------', () => {
    it('should have a authenticate method', async () => {
      const result = await store.authenticate('something', 'something');
      expect(result).toBeDefined;
    });
    it('expects authenticate method to resolve', async () => {
      await expectAsync(store.authenticate('something', 'something')).toBeResolved();
    });
    it('expects authenticate method to return the user object', async () => {
      const result = await store.authenticate('something', 'something');
      // @ts-ignore
      const { first_name, last_name, user_name } = result;
      expect({ first_name, last_name, user_name }).toEqual({
        first_name: 'something',
        last_name: 'something',
        user_name: 'something',
      });
    });
    it('expects authenticate method to be resolved to null', async () => {
      await expectAsync(store.authenticate('asdf', 'something')).toBeResolvedTo(null);
    });
    it('expects authenticate method to be resolved to null', async () => {
      await expectAsync(store.authenticate('something', 'asdf')).toBeResolvedTo(null);
    });
    it('expects authenticate method to be resolved to null', async () => {
      await expectAsync(store.authenticate('asdf', 'asdf')).toBeResolvedTo(null);
    });
  });

  describe('-------- delete() tests --------', () => {
    const user: User = {
      firstName: 'something',
      lastName: 'something',
      username: 'something',
      password: 'something',
    };
    it('should have a delete method', async () => {
      await store.create(user);
      const result = await store.delete(4);
      expect(result).toBeDefined;
    });
    it('expects delete method to resolve', async () => {
      await store.create(user);
      await expectAsync(store.delete(5)).toBeResolved();
    });
  });
});
