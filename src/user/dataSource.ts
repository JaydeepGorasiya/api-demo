import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    host: 'localhost',
    type: 'mysql',
    port: 3306,
    username: 'root',
    password: '',
    database: 'api_demo',
    entities: [__dirname+'/**/*.entity{.ts,.js}'],
})

AppDataSource.initialize().then(() => {}).catch((error)=>console)