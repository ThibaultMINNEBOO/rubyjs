import { Dialect, Sequelize } from "sequelize";

export class Database {
  private static instance: Sequelize|null = null;

  private constructor() {}

  public static get(): Sequelize {
    if (this.instance) return this.instance;

    return new Sequelize({
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      dialect: process.env.DB_SERVICE as Dialect,
    });
  }
}