require('dotenv/config');
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sample_clean1',
  port: Number(process.env.DB_PORT) || 3306,
  charset: 'utf8',
  synchronize: false,
  entities: process.env.NODE_ENV !== 'production' ? ['**/**.entity.ts'] : ['dist/**/*.entity.js'],
  logging: process.env.NODE_ENV !== 'production' ? ['error','warn','migration'] : ['error'],
  migrations: ['src/migrations/*.ts'],
  connectTimeout: 30000,
  acquireTimeout: 30000
})

export default AppDataSource;