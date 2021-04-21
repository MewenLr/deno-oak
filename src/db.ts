
import config from './config/parameters.ts'
import { errors } from './helpers/index.ts'
import { MongoClient } from 'https://deno.land/x/mongo@v0.22.0/mod.ts'
import { Database } from 'https://deno.land/x/mongo@v0.22.0/src/database.ts'

export default class Db {

  public static connect = async (): Promise<Database|undefined> => {
    try {
      const client = new MongoClient()
      await client.connect(config.dbUri)
      return client.database(config.dbName)
    } catch (e) {
      throw errors.connectDbFail
    }
  }

}
