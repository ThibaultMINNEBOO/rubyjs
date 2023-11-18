import { Dialect, Sequelize } from "sequelize";

export class Database {
  private static instance: Sequelize|null = null;

  private constructor() {}

  public static get(): Sequelize {
    if (this.instance) return this.instance;

    return new Sequelize({
      host: process.env.MARIADB_HOST,
      username: process.env.MARIADB_USERNAME,
      password: process.env.MARIADB_PASSWORD,
      database: process.env.MARIADB_DATABASE,
      dialect: process.env.DB_SERVICE as Dialect,
    });
  }
}