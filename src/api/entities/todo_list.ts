import { Type } from "@serverless-seoul/typebox";
import { DataLayout, PaginatedDataLayout } from "./layout";

export const TodoList = Type.Object({
  id: Type.String(),
  name: Type.String(),
  numberOfItems: Type.Number(),
  numberOfCompletedItems: Type.Number(),
});

export const TodoListShow = DataLayout(TodoList);
export const TodoListList = PaginatedDataLayout(TodoList);
