import { instanceToPlain } from 'class-transformer';
import UserPresenter from '../../user.presenter';
import { create } from 'domain';

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
