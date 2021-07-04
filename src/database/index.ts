import { Connection, createConnections } from "typeorm"

export default async (): Promise<Connection[]> => {
return createConnections([{
    name: DB_NAME.MACAPA,
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "mercafacil_app"
  }, {
    name: DB_NAME.VAREJAO,
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "root",
    database: "mercafacil_app"
  }])
}

const DB_NAME = {
  MACAPA: "macapa",
  VAREJAO: "varejao"
}

export { DB_NAME }