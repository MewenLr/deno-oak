import { queries } from './index.ts'
import { errors } from '../helpers/index.ts'
import { Obj } from '../contracts/types/index.ts'

export default async (collectionName: string, values: Obj[]): Promise<void> => {

  try {
    values.forEach((value) => {
      if (Object.keys(value).length !== 1) throw errors.uniqueKeyTest
    })

    for (let i = 0; i < values.length; i += 1) {
      const count = await queries.count(collectionName, values[i])
      if (count > 0) throw errors.uniqueDoc(Object.keys(values[i])[0])
    }

  } catch(e) {
    throw e
  }

}
