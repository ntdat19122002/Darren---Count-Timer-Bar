import { EntitySchema } from "typeorm";

export const ShopifyStore = new EntitySchema({
  name: "ShopifyStore",
  tableName: "shopify_store",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    store_url: {
      type: "varchar",
      nullable: true,
    },
    primary_domain: {
      type: "varchar",
      nullable: true,
    },
    install_status: {
      type: "boolean",
      default: true,
    },
    timezone: {
      type: "varchar",
      nullable: true,
    },
    shopify_access_token: {
      type: "varchar",
      nullable: true,
    },
    shop_id: {
      type: "varchar",
      nullable: true,
    },
    currency: {
      type: "varchar",
      nullable: true,
    },
    primary_locale: {
      type: "varchar",
      nullable: true,
    },
    country: {
      type: "varchar",
      nullable: true,
    },
    phone: {
      type: "varchar",
      nullable: true,
    },
  },
});