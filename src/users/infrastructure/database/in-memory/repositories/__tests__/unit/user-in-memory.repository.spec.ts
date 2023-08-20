import { UserEntity } from '@/users/domain/entities/user.entity';
import UserInMemoryRepository from '../../user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { ConflictError } from '@/shared/domain/errors/conflict-error';

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository;

  beforeEach(() => {
    sut = new UserInMemoryRepository();
  });

  describe('findByEmail method', () => {
    it('Should throw error when not found', async () => {
      await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
        new NotFoundError('Entity not found using email a@a.com'),
      );
    });

    it('Should find a entity by email', async () => {
      const entity = new UserEntity(UserDataBuilder({ name: 'b@b.com' }));

      await sut.insert(entity);

      const result = await sut.findByEmail(entity.email);

      expect(entity.toJSON()).toStrictEqual(result.toJSON());
    });
  });

  describe('emailExists method', () => {
    it('Should throw error when not found', async () => {
      const entity = new UserEntity(UserDataBuilder({ name: 'c@c.com' }));

      await sut.insert(entity);

      await expect(sut.emailExists(entity.email)).rejects.toThrow(
        new ConflictError('Email address already used'),
      );
    });

    it('Should find a entity by email', async () => {
      expect.assertions(0);

      await sut.emailExists('a@a.com');
    });
  });

  describe('applyFilter', () => {
    it('Should no filter items when filter object is null', async () => {
      const entity = new UserEntity(UserDataBuilder());

      await sut.insert(entity);

      const result = await sut.findAll();

      const spyFilter = jest.spyOn(result, 'filter');

      const itemsFiltered = await sut['applyFilter'](result, null);

      expect(spyFilter).not.toHaveBeenCalled();
      expect(result).toStrictEqual(itemsFiltered);
    });

    it('Should filter name field using filter param', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ name: 'Test' })),
        new UserEntity(UserDataBuilder({ name: 'TEST' })),
        new UserEntity(UserDataBuilder({ name: 'fake' })),
      ];

      const spyFilter = jest.spyOn(items, 'filter');

      const itemsFiltered = await sut['applyFilter'](items, 'test');

      expect(spyFilter).toHaveBeenCalled();
      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    });
  });

  describe('applySort', () => {
    it('Should sort by createdAt when sort param is null', async () => {
      const createdAt = new Date();

      const items = [
        new UserEntity(UserDataBuilder({ name: 'Test', createdAt })),
        new UserEntity(
          UserDataBuilder({
            name: 'TEST',
            createdAt: new Date(createdAt.getTime() + 1),
          }),
        ),
        new UserEntity(
          UserDataBuilder({
            name: 'fake',
            createdAt: new Date(createdAt.getTime() + 2),
          }),
        ),
      ];

      const itemsSortered = await sut['applySort'](items, null, null);

      expect(itemsSortered).toStrictEqual([items[2], items[1], items[0]]);
    });

    it('Should sort by name field', async () => {
      const items = [
        new UserEntity(UserDataBuilder({ name: 'c' })),
        new UserEntity(
          UserDataBuilder({
            name: 'd',
          }),
        ),
        new UserEntity(
          UserDataBuilder({
            name: 'a',
          }),
        ),
      ];

      let itemsSortered = await sut['applySort'](items, 'name', 'asc');

      expect(itemsSortered).toStrictEqual([items[2], items[0], items[1]]);

      itemsSortered = await sut['applySort'](items, 'name', null);

      expect(itemsSortered).toStrictEqual([items[1], items[0], items[2]]);
    });
  });
});
