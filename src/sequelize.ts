import { Sequelize } from "sequelize";

export const SequelizeSingleton = new Sequelize('sqlite:memory');