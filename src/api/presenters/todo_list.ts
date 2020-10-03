import { Static } from "@serverless-seoul/typebox";

import { createPresenter } from "./helper";

// Entities
import * as Entities from "../entities";

// Models
import { TodoList } from "../../models";

export const TodoListShow = createPresenter(Entities.TodoListShow, async (model: TodoList) => {
  return {
    data: presentList([model])[0],
  };
});

export const TodoListList = createPresenter(Entities.TodoListList, async (input: {
  data: TodoList[],
  paging: { after?: string, before?: string },
}) => {
  return {
    data: presentList(input.data),
    paging: input.paging,
  };
});

function presentList(models: TodoList[]): Array<Static<typeof Entities.TodoList>> {
  return models.map(t => ({
    id: t.id,
    name: t.name,
    numberOfItems: t.numberOfItems,
    numberOfCompletedItems: t.numberOfCompletedItems,
  }));
}
