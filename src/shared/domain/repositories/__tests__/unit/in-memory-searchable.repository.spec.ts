import { Entity } from '@/shared/domain/entities/entity';
import { InMemorySearchableRepository } from '../../in-memory-searchable.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  protected async applyFilter(
    items: StubEntity[],
    filter: string | null,
  ): Promise<StubEntity[]> {
    if (!filter) return items;

    return items.filter(item =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }
}

describe('InMemorySearchableRepository unit tests', () => {
  let sut: StubInMemorySearchableRepository;

  beforeEach(() => {
    sut = new StubInMemorySearchableRepository();
  });

  describe('applyFilter method', () => {
    it('should no filter items when filter param is null', async () => {
      const items = [new StubEntity({ name: 'name value', price: 100 })];

      const spyFilterMethod = jest.spyOn(items, 'filter');

      const itemsFiltered = await sut['applyFilter'](items, null);

      expect(items).toStrictEqual(itemsFiltered);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('should filter items using filter param', async () => {
      const items = [
        new StubEntity({ name: 'TEST', price: 100 }),
        new StubEntity({ name: 'test', price: 100 }),
        new StubEntity({ name: 'fake', price: 100 }),
      ];

      const spyFilterMethod = jest.spyOn(items, 'filter');

      let itemsFiltered = await sut['applyFilter'](items, 'TEST');

      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await sut['applyFilter'](items, 'test');

      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);

      itemsFiltered = await sut['applyFilter'](items, 'no-filter');

      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(3);
    });
  });

  describe('applySort method', () => {
    it('should no sort items', async () => {
      const items = [
        new StubEntity({ name: 'a', price: 100 }),
        new StubEntity({ name: 'b', price: 100 }),
      ];

      let itemsSorted = await sut['applySort'](items, null, null);

      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await sut['applySort'](items, 'price', 'asc');

      expect(itemsSorted).toStrictEqual(items);

      itemsSorted = await sut['applySort'](items, 'price', 'desc');

      expect(itemsSorted).toStrictEqual(items);
    });

    it('should sort items', async () => {
      const items = [
        new StubEntity({ name: 'b', price: 100 }),
        new StubEntity({ name: 'a', price: 100 }),
        new StubEntity({ name: 'c', price: 100 }),
      ];

      const itemsSorted = await sut['applySort'](items, 'name', 'asc');

      expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);

      // itemsSorted = await sut['applySort'](items, 'price', 'asc');

      // expect(itemsSorted).toStrictEqual(items);

      // itemsSorted = await sut['applySort'](items, 'price', 'desc');

      // expect(itemsSorted).toStrictEqual(items);
    });
  });

  describe('applyPaginate method', () => {});

  describe('search method', () => {});
});
