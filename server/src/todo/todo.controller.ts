import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ToDoService } from "./todo.service";
import { ToDo } from "./schemas/todo.schema";


@Controller('todos')
export class ToDoController{
    constructor (private toDoService : ToDoService){}

    @Get()
    async getAllTodDos():Promise<ToDo[]>{
        return this.toDoService.findAll()
    }

    @Post()
    async createToDos(
        @Body()
        todo,
    ):Promise<ToDo>{
        return this.toDoService.create(todo);
    }

    @Put(':id')
    async updateToDo(
        @Param('id')
        id:string,
        @Body()
        todo,
    ): Promise<ToDo>{
        return this.toDoService.updateById(id, todo);
    }
    @Delete(':id')
    async deleteToDo(
        @Param('id')
        id:string,
    ): Promise<ToDo>{
        return this.toDoService.delteById(id);
    }
}