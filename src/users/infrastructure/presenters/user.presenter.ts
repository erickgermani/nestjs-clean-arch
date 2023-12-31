import ColletionPresenter from '@/shared/infrastructure/presenters/collection.presenter';
import { UserOutput } from '@/users/application/dtos/user-output';
import ListUsersUseCase from '@/users/application/usecases/list-users.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

class UserPresenter {
  @ApiProperty({ description: 'User id' })
  id: string;

  @ApiProperty({ description: 'User name' })
  name: string;

  @ApiProperty({ description: 'User email' })
  email: string;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  @ApiProperty({ description: 'User creation date' })
  createdAt: Date;

  constructor(output: UserOutput) {
    this.id = output.id;
    this.name = output.name;
    this.email = output.email;
    this.createdAt = output.createdAt;
  }
}

class UserCollectionPresenter extends ColletionPresenter {
  data: UserPresenter[];

  constructor(output: ListUsersUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new UserPresenter(item));
  }
}

export { UserCollectionPresenter };
export default UserPresenter;
