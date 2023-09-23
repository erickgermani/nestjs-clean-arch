import { instanceToPlain } from 'class-transformer';
import UserPresenter, { UserCollectionPresenter } from '../../user.presenter';
import PaginationPresenter from '@/shared/infrastructure/presenters/pagination.presenter';

describe('UserPresenter unit tests', () => {
  let sut: UserPresenter;

  const createdAt = new Date();

  const props = {
    id: 'beca4dc4-399e-4c4b-b6e5-bb032559fb95',
    name: 'test name',
    email: 'test@mail.com',
    password: 'fake',
    createdAt,
  };

  beforeEach(() => {
    sut = new UserPresenter(props);
  });

  describe('constructor', () => {
    it('should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.name).toEqual(props.name);
      expect(sut.email).toEqual(props.email);
      expect(sut.createdAt).toEqual(props.createdAt);
    });
  });

  it('should presenter data', () => {
    const output = instanceToPlain(sut);

    expect(output).toEqual({
      id: 'beca4dc4-399e-4c4b-b6e5-bb032559fb95',
      name: 'test name',
      email: 'test@mail.com',
      createdAt: createdAt.toISOString(),
    });
  });
});

describe('UserCollectionPresenter unit tests', () => {
  const createdAt = new Date();

  const props = {
    id: 'beca4dc4-399e-4c4b-b6e5-bb032559fb95',
    name: 'test name',
    email: 'test@mail.com',
    password: 'fake',
    createdAt,
  };

  describe('constructor', () => {
    it('should set values', () => {
      const sut = new UserCollectionPresenter({
        items: [props],
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      });

      expect(sut.meta).toBeInstanceOf(PaginationPresenter);
      expect(sut.meta).toStrictEqual(
        new PaginationPresenter({
          currentPage: 1,
          perPage: 2,
          lastPage: 1,
          total: 1,
        }),
      );
      expect(sut.data).toEqual([new UserPresenter(props)]);
    });
  });

  it('should presenter data', () => {
    let sut = new UserCollectionPresenter({
      items: [props],
      currentPage: 1,
      perPage: 2,
      lastPage: 1,
      total: 1,
    });

    let output = instanceToPlain(sut);

    expect(output).toStrictEqual({
      data: [
        {
          id: 'beca4dc4-399e-4c4b-b6e5-bb032559fb95',
          name: 'test name',
          email: 'test@mail.com',
          createdAt: createdAt.toISOString(),
        },
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      },
    });

    sut = new UserCollectionPresenter({
      items: [props],
      currentPage: '1' as any,
      perPage: '2' as any,
      lastPage: '1' as any,
      total: '1' as any,
    });

    output = instanceToPlain(sut);

    expect(output).toStrictEqual({
      data: [
        {
          id: 'beca4dc4-399e-4c4b-b6e5-bb032559fb95',
          name: 'test name',
          email: 'test@mail.com',
          createdAt: createdAt.toISOString(),
        },
      ],
      meta: {
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
        total: 1,
      },
    });
  });
});
