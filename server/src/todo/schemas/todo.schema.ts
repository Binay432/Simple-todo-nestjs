import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ToDoDocument = HydratedDocument<ToDo>;

@Schema({
    timestamps: true,
})
export class ToDo {
  @Prop()
  text: string;
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo);