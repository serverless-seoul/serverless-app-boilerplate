import { Decorator, Query, Table } from "@serverless-seoul/dynamorm";
import * as _ from "lodash";

@Decorator.Table({ name: `${process.env.STAGE}_todo_list` })
export class TodoList extends Table {
  @Decorator.HashPrimaryKey("id")
  public static readonly primaryKey: Query.HashPrimaryKey<TodoList, string>;

  @Decorator.Writer()
  public static readonly writer: Query.Writer<TodoList>;

  @Decorator.Attribute({ name: "id" })
  public id!: string;

  @Decorator.Attribute({ name: "name" })
  public name!: string;

  @Decorator.Attribute({ name: "numberOfItems" })
  public numberOfItems!: number;

  @Decorator.Attribute({ name: "numberOfCompletedItems" })
  public numberOfCompletedItems!: number;
}
