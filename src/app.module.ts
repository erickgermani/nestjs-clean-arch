import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UsersModule } from './users/infrastructure/users.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { PrismaService } from './shared/infrastructure/database/prisma/prisma.service';
import { AuthModule } from './auth/infrastructure/auth.module';
import { FilterService } from './shared/infrastructure/exception-filters/invalid-credentials-error/filter/filter.service';

@Module({
  imports: [EnvConfigModule, UsersModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, FilterService],
})
export class AppModule {}
