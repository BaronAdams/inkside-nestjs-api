import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { User } from './user/user.model';
import { Post } from './post/post.model';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true }),
    AuthModule,
    UserModule,
    PostModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      models: [User,Post],
    }) 
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}


