import { config } from 'https://deno.land/x/dotenv@v2.0.0/mod.ts'

const CONF = config()

export default {
  apiVersion: '/api/v1',
  port: CONF.PORT ? +CONF.PORT : 8000,
  dbName: CONF.DB_NAME ? CONF.DB_NAME : 'dbdev',
  jwtSecret: CONF.JWT_SECRET ? CONF.JWT_SECRET : '12345678901234567',
  dbUri: CONF.DB_URI ? CONF.DB_URI : 'mongodb://dbuser:dbpass@localhost:27017/dbdev',
}
