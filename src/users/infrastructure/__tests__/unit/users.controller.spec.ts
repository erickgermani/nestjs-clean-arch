import SignupUseCase from '@/users/application/usecases/signup.usecase';
import { UsersController } from '../../users.controller';
import { UserOutput } from '@/users/application/dtos/user-output';
import { SignupDto } from '../../dtos/signup.dto';

describe('UsersController unit tests', () => {
  let sut: UsersController;
  let id: string;
  let props: UserOutput;

  beforeEach(() => {
    sut = new UsersController();
    id = 'bd29087f-19a5-495c-9804-3532801b6dd5';
    props = {
      id,
      name: 'John Doe',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should create a user', async () => {
    const output: SignupUseCase.Output = props;

    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    sut['signupUseCase'] = mockSignupUseCase as any;

    const input: SignupDto = {
      name: 'John Doe',
      email: 'a@a.com',
      password: '1234',
    };

    const result = await sut.create(input);

    expect(output).toMatchObject(result);
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input);
  });
});
