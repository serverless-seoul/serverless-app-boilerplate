import { Namespace, Parameter, PresenterRouteFactory, StandardError } from "@serverless-seoul/corgi";
import { Type } from "@serverless-seoul/typebox";

// Models
import { TodoItem, TodoList } from "../../models";

// Presenters
import * as Presenters from "../presenters";

async function findTodoList(id: string) {
  const todoList = await TodoList.primaryKey.get(id);
  if (!todoList) {
    throw new StandardError(404, { code: "NOT_FOUND", message: `List with id(${id}) not exists` });
  }
  return todoList;
}

export const route = new Namespace(
  "/todo-lists", {}, {
    children: [
      PresenterRouteFactory.GET(
        "", {
          desc: "list all todo lists", operationId: "listTodoLists"
        }, {
          after: Parameter.Query(Type.Optional(Type.String())),
        }, Presenters.TodoListList, async function() {
          const exclusiveStartKey = this.params.after ? JSON.parse(this.params.after) : undefined;
          const { records, lastEvaluatedKey } = await TodoList.primaryKey.scan({ limit: 10, exclusiveStartKey });

          return {
            data: records,
            paging: {
              after: lastEvaluatedKey && JSON.stringify(lastEvaluatedKey),
            }
          };
        }),

      PresenterRouteFactory.POST(
        "", {
          desc: "create new todo lists", operationId: "createTodoList"
        }, {
          // You can reuse Entity as part of type like this. as long it's typebox object
          todoList: Parameter.Body(Type.Object({
            name: Type.String({ minLength: 1, maxLength: 16 }),
          })),
        }, Presenters.TodoListShow, async function() {
          const record = new TodoList();
          record.id = Math.random().toString(); // just random id
          record.name = this.params.todoList.name;
          record.numberOfItems = 0;
          record.numberOfCompletedItems = 0;
          await record.save();
          return record;
        }),

      new Namespace(
        "/:listId", {
          listId: Type.String()
        }, {
          children: [
            PresenterRouteFactory.GET(
              "", {
                operationId: "describeTodoList"
              }, {}, Presenters.TodoListShow, async function() {
                const todoList = await findTodoList(this.params.listId);
                return todoList;
              }),

            new Namespace(
              "/items", {}, {
                children: [
                  PresenterRouteFactory.POST(
                    "", {
                      desc: "create new todo item", operationId: "createTodoItem"
                    }, {
                      // You can reuse Entity as part of type like this. as long it's typebox object
                      todoItem: Parameter.Body(Type.Object({
                        name: Type.String({ minLength: 1, maxLength: 16 }),
                      })),
                    }, Presenters.TodoItemShow, async function() {
                      const record = new TodoItem();
                      record.listId = this.params.listId;
                      record.itemId = Math.random().toString(); // just random id
                      record.name = this.params.todoItem.name;
                      record.createdAt = Date.now() / 1000;
                      record.completedAt = null;
                      await record.save();
                      return record;
                    }),

                  PresenterRouteFactory.GET(
                    "", {
                      desc: "list todo item within todoList", operationId: "listTodoItems"
                    }, {}, Presenters.TodoItemList, async function() {
                      const { records } = await TodoItem.primaryKey.query({ hash: this.params.listId });
                      return {
                        data: records,
                        paging: {}
                      };
                    }),
                ]
              })
          ]
        })
    ]
  });
