import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env file');
}

export const config = {
  db: {
    environment: process.env.DB_ENVIRONMENT || 'development',
    host: process.env.DB_HOST_1,
    port: parseInt(process.env.DB_PORT_1 || '3306'),
    user: process.env.DB_USER_1,
    password: process.env.DB_PASS_1,
    database: process.env.DB_MAIN,
    //db_cerberp: process.env.DB_CERBERO,
    //db_hoteles: process.env.DB_HOTEL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  api: {
    api_port: parseInt(process.env.API_PORT || '3000'),
  },
};
