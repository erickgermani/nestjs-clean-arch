import UserRepository from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUserCase } from '@/shared/application/usecases/use-case';
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error';

namespace SigninUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUserCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, password } = input;

      if (!email || !password)
        throw new BadRequestError('Input data not provided');

      const entity = await this.userRepository.findByEmail(email);

      const hashPasswordMatch = await this.hashProvider.compareHash(
        password,
        entity.password,
      );

      if (!hashPasswordMatch)
        throw new InvalidCredentialsError('Invalid credentials');

      return UserOutputMapper.toOutput(entity);
    }
  }
}

export default SigninUseCase;
