import { Sequelize } from "sequelize";

const db = new Sequelize(
  "windelov_v2_auth_db",
  "windelov_admin",
  "opz4sz81ydt3",
  {
    host: "api.windelov.my.id",
    dialect: "mysql",
  }
);

export default db;
