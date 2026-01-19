import { initializeAndAssociate } from "lib/db";
import { Sequelize, Options, Dialect } from "sequelize";

const dbConfig: Options = {
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  host: process.env.HOST!,
  port: +process.env.PORT!,
  database: process.env.DB_NAME!,
  dialect: (process.env.DB_DIALECT! as Dialect)
}
const sequelize = new Sequelize(dbConfig);

initializeAndAssociate(sequelize);

export default sequelize