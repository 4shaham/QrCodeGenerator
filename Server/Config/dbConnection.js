import Sequelize from "sequelize";
import dotenv from "dotenv";
import UserModel from "../Model/user.js";
import VoucherModel from "../Model/voucher.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);

const db = {};
db.user2 = UserModel(sequelize);  
db.voucher = VoucherModel(sequelize);

// Sync all models with the database
sequelize.sync();

export default db;
