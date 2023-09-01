/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost', // Your PostgreSQL host
  port: 5432, // Your PostgreSQL port
  username: 'postgres', // Your PostgreSQL username
  password: 'postgres', // Your PostgreSQL password
  database: 'user_manager', // Your PostgreSQL database name
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeOrmConfig;
