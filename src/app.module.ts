import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

// modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, BusinessModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
