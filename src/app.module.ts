import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    host: 'localhost',
    type: 'mysql',
    port: 3306,
    username: 'root',
    password: '',
    database: 'api_demo',
    entities: [__dirname+'/**/*.entity{.ts,.js}'],
    // synchronize: true,
  }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
