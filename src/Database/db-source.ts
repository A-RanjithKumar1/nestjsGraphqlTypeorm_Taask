import { DataSource, DataSourceOptions } from 'typeorm';
import dbconfig from './db-config';
const data = dbconfig();
export const dataSourceOpitions: DataSourceOptions = {
  type: 'postgres',
  host: data.host,
  port: parseInt(data.port),
  username: data.username,
  password: data.password,
  database: data.dbName,
  entities: ['dist/**/*.entity.js'],
  migrations: [__dirname + '/./migrations/**/*{.ts,.js}'],
  synchronize: true,
};
const datasource = new DataSource(dataSourceOpitions);
export default datasource;
