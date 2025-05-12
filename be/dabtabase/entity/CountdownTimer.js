import { EntitySchema } from "typeorm";

export const CountdownTimer = new EntitySchema({
  name: "CountdownTimer",
  tableName: "countdown_timer",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      default: "Countdown timer",
    },
    type: {
      type: "varchar",
    },
    setting: {
      type: "text",
    }
  },
  relations: {
    store: {
      type: "many-to-one",
      target: "ShopifyStore",
      joinColumn: {
        name: "store_id",
      },
      nullable: false,
      eager: true, // tự động load store nếu cần
    },
  }
});