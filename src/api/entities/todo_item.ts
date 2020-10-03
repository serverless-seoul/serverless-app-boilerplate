import { Type } from "@serverless-seoul/typebox";
import { DataLayout, PaginatedDataLayout } from "./layout";

export const TodoItem = Type.Object({
  id: Type.String(),
  name: Type.String(),
  createdAt: Type.Number(),
  completedAt: Type.Union([Type.Number(), Type.Null()]),
});

export const TodoItemShow = DataLayout(TodoItem);
export const TodoItemList = PaginatedDataLayout(TodoItem);
