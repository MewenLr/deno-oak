import { connect } from '../utils/index.ts'
import { errors } from '../helpers/index.ts'
import { Obj } from '../contracts/types/index.ts'
import { Document } from 'https://deno.land/x/mongo@v0.22.0/src/types.ts'

export default {

  count: async(collectionName: string, query: Obj): Promise<number> => {
    try {
      const collection = await connect(collectionName)
      const count = await collection.count(query)
      if (typeof count !== 'number') throw errors.failCountDoc
      return count
    } catch(e) {
      throw e
    }
  },

  insertOne: async(collectionName: string, document: Obj): Promise<Document> => {
    try {
      const collection = await connect(collectionName)
      const docId = await collection.insertOne(document)
      if (!docId) throw errors.failInsertDoc
      return docId
    } catch(e) {
      throw e
    }
  },

  findOne: async(collectionName: string, query: Obj): Promise<Document> => {
    try {
      const collection = await connect(collectionName)
      const doc = await collection.findOne(query) as unknown as Document
      if (!doc || (doc && Object.keys(doc).length === 0)) throw errors.noDocFound
      return doc
    } catch(e) {
      throw e
    }
  },

  updateOne: async(collectionName: string, query: Obj, update: Obj): Promise<void> => {
    try {
      const collection = await connect(collectionName)
      const { modifiedCount } = await collection.updateOne(query, { $set: update }) as unknown as Document
      if (modifiedCount !== 1) throw errors.failUpdateDoc
    } catch(e) {
      throw e
    }
  },

  deleteOne: async(collectionName: string, query: Obj): Promise<void> => {
    try {
      const collection = await connect(collectionName)
      const doc = await collection.deleteOne(query) as unknown as Document
    } catch(e) {
      throw e
    }
  },

}
