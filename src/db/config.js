import { Sequelize } from "sequelize";

const envData = process.env;

const sequelize = new Sequelize(
  envData.DB_USER,
  envData.DB_NAME,
  envData.DB_PASSWORD,
  {
    host: envData.DB_HOST,
    port: envData.DB_PORT,
    dialect: envData.DB_DIALECT,
    logging: false,
  }
);

export const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB authenticate successful.");
  } catch (err) {
    console.log("DB authentication fails.", err);
  }
};

export default sequelize;
