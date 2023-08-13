import { Sequelize } from "sequelize";

export class Database {
    public static start(): Sequelize {
        return new Sequelize({
            host: process.env.MARIADB_HOST,
            username: process.env.MARIADB_USERNAME,
            password: process.env.MARIADB_PASSWORD,
            database: process.env.MARIADB_DATABASE,
            dialect: 'mariadb'
        });
    }
}