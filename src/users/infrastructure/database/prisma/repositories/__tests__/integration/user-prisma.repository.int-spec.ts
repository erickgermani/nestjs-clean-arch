import { PrismaClient } from '@prisma/client';
import UserPrismaRepository from '../../user-prisma.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserPrismaRepository integration tests', () => {
  const prismaService = new PrismaClient();

  let sut: UserPrismaRepository;

  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();

    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
  });

  beforeEach(async () => {
    sut = new UserPrismaRepository(prismaService as any);

    await prismaService.user.deleteMany();
  });

  it('Should throws error when entity not found', async () => {
    expect(() => sut.findById('FakeId')).rejects.toThrow(
      new Error('UserModel not found using ID FakeId'),
    );
  });

  it('Should finds an entity by id', async () => {
    const entity = new UserEntity(UserDataBuilder());
    const newUser = await prismaService.user.create({
      data: entity.toJSON(),
    });

    const output = await sut.findById(newUser.id);

    expect(output.toJSON()).toStrictEqual(entity.toJSON());
  });
});
