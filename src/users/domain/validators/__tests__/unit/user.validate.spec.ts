import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import {
  UserRules,
  UserValidator,
  UserValidatorFactory,
} from '../../user.validator';

let sut: UserValidator;

describe('UserValidator unit tests', () => {
  beforeEach(() => {
    sut = UserValidatorFactory.create();
  });

  it('Valid case for User Rules', () => {
    const props = UserDataBuilder({});

    const isValid = sut.validate(props);

    expect(isValid).toBeTruthy();
    expect(sut.validatedData).toStrictEqual(new UserRules(props));
  });

  it('Invalidation cases for name field', () => {
    let isValid = sut.validate(null);

    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name should not be empty',
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), name: '' });

    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual(['name should not be empty']);

    isValid = sut.validate({ ...UserDataBuilder({}), name: 5 as any });

    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name must be a string',
      'name must be shorter than or equal to 255 characters',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), name: 'a'.repeat(256) });

    expect(isValid).toBeFalsy();
    expect(sut.errors['name']).toStrictEqual([
      'name must be shorter than or equal to 255 characters',
    ]);
  });

  it('Invalidation cases for email field', () => {
    let isValid = sut.validate(null);

    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
      'email must be a string',
      'email must be shorter than or equal to 255 characters',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), email: '' });

    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email should not be empty',
      'email must be an email',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), email: 5 as any });

    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email must be an email',
      'email must be a string',
      'email must be shorter than or equal to 255 characters',
    ]);

    isValid = sut.validate({
      ...UserDataBuilder({}),
      email: 'a'.repeat(256),
    });

    expect(isValid).toBeFalsy();
    expect(sut.errors['email']).toStrictEqual([
      'email must be an email',
      'email must be shorter than or equal to 255 characters',
    ]);
  });

  it('Invalidation cases for password field', () => {
    let isValid = sut.validate(null);

    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), password: '' });

    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password should not be empty',
    ]);

    isValid = sut.validate({ ...UserDataBuilder({}), password: 5 as any });

    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password must be a string',
      'password must be shorter than or equal to 100 characters',
    ]);

    isValid = sut.validate({
      ...UserDataBuilder({}),
      password: 'a'.repeat(256),
    });

    expect(isValid).toBeFalsy();
    expect(sut.errors['password']).toStrictEqual([
      'password must be shorter than or equal to 100 characters',
    ]);
  });
});
