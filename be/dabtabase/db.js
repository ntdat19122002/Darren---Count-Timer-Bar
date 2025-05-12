import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { ShopifyStore } from "./entity/ShopifyStore.js";
import { CountdownTimer } from "./entity/CountdownTimer.js";

dotenv.config();

export const db = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [ShopifyStore,CountdownTimer], // Ensure User is registered properly
});

db.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default db;