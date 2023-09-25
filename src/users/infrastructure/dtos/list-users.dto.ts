import { SortDirection } from '@/shared/domain/repositories/searchable-repository-contracts';
import ListUsersUseCase from '@/users/application/usecases/list-users.usecase';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ListUsersDto implements ListUsersUseCase.Input {
  @ApiPropertyOptional({ description: 'Page number that will returned' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Quantity of registers per page' })
  @IsOptional()
  perPage?: number;

  @ApiPropertyOptional({
    description: 'Defined column to order data: "name" or "createdAt"',
  })
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({
    description: 'Defined direction to order data: "asc" or "desc"',
  })
  @IsOptional()
  sortDir?: SortDirection;

  @ApiPropertyOptional({ description: 'Defined filter to search data' })
  @IsOptional()
  filter?: string;
}
