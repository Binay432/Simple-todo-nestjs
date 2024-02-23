import { Injectable } from "@nestjs/common";
import * as mongoose from "mongoose";
import { ToDo } from "./schemas/todo.schema";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class ToDoService{
    constructor(
        @InjectModel(ToDo.name)
        private toDoModel: mongoose.Model<ToDo>
    ){}

    async findAll(): Promise<ToDo[]>{
        const todos = await this.toDoModel.find();
        return todos;
    }
    async create(todo:ToDo):Promise<ToDo>{
        const res = await this.toDoModel.create(todo);
        return res;
    }

    async updateById(id:string, todo: ToDo):Promise<ToDo>{
        return await this.toDoModel.findByIdAndUpdate(id, todo,{
            new:true,
            runValidators: true,
        });
    }
    async delteById(id:string):Promise<ToDo>{
        return await this.toDoModel.findByIdAndDelete(id);
    }
}