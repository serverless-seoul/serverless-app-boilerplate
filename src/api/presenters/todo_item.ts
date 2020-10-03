import { Static } from "@serverless-seoul/typebox";

import { createPresenter } from "./helper";

// Entities
import * as Entities from "../entities";

// Models
import { TodoItem } from "../../models";

export const TodoItemShow = createPresenter(Entities.TodoItemShow, async (model: TodoItem) => {
  return {
    data: presentList([model])[0],
  };
});

export const TodoItemList = createPresenter(Entities.TodoItemList, async (input: {
  data: TodoItem[],
  paging: { after?: string, before?: string },
}) => {
  return {
    data: presentList(input.data),
    paging: input.paging,
  };
});

function presentList(models: TodoItem[]): Array<Static<typeof Entities.TodoItem>> {
  return models.map(t => ({
    id: t.itemId,
    name: t.name,
    createdAt: t.createdAt,
    completedAt: t.completedAt,
  }));
}
