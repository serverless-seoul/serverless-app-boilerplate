import { Decorator, Query, Table } from "@serverless-seoul/dynamorm";
import * as _ from "lodash";

@Decorator.Table({ name: `${process.env.STAGE}_todo_item` })
export class TodoItem extends Table {
  @Decorator.FullPrimaryKey("listId", "itemId")
  public static readonly primaryKey: Query.FullPrimaryKey<TodoItem, string, number>;

  @Decorator.Writer()
  public static readonly writer: Query.Writer<TodoItem>;

  @Decorator.Attribute({ name: "listId" })
  public listId!: string;

  @Decorator.Attribute({ name: "itemId" })
  public itemId!: string;

  @Decorator.Attribute({ name: "name" })
  public name!: string;

  @Decorator.Attribute({ name: "createdAt" })
  public createdAt!: number;

  @Decorator.Attribute({ name: "completedAt" })
  public completedAt!: number | null;
}
