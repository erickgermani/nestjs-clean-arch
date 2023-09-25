import UpdatePasswordUseCase from '@/users/application/usecases/update-password.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto
  implements Omit<UpdatePasswordUseCase.Input, 'id'>
{
  @ApiProperty({ description: 'New user password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Current user password' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
