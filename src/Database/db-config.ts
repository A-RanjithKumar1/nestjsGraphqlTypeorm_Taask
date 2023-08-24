import * as dotenv from 'dotenv';
dotenv.config();
export default () => {
  return {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  };
};
