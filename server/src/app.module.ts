import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal : true,
    }),
    AuthModule, 
    TodoModule,
    MongooseModule.forRoot(process.env.DB_URL)
  ],
})
export class AppModule {}
