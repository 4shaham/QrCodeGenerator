import sequelize from 'sequelize';
import User2 from './user';


sequelize.sync(); // Create tables based on models

module.exports = { User2 };
