import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";

export const config : DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'job_portal',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migration/*.js'],
}

const dataSource = new DataSource(config)
export default dataSource;