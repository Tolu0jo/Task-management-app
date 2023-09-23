import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const typeOrmConfig:TypeOrmModuleOptions={
type:"postgres",
host: process.env.DB_HOST,
port:+process.env.DB_PORT,
username:process.env.DB_USERNAME,
password:process.env.DB_PASSWORD,
database:"Task management",
entities:[__dirname + '/../**/*.entity{.ts,.js}'],
synchronize:true
}
