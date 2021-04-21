import Db from '../db.ts'
import { errors } from '../helpers/index.ts'
import { Obj } from '../contracts/types/index.ts'
import { Collection } from 'https://deno.land/x/mongo@v0.22.0/src/collection/collection.ts'

export default async (collectionName: string): Promise<Collection<Obj>> => {
  try {
    const db = await Db.connect()

    if (!db) throw errors.noDb

    return db.collection(collectionName)
  } catch (e) {
    throw e
  }
}
