import { Module } from '@nestjs/common';
import { ToDoController } from './todo.controller';
import { ToDoService } from './todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ToDoSchema } from './schemas/todo.schema';

@Module({
    imports:[MongooseModule.forFeature([{ name: 'ToDo', schema: ToDoSchema}])],
    controllers: [ToDoController],
    providers: [ToDoService]
})
export class TodoModule {}
