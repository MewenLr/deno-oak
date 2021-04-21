import { Obj } from '../contracts/types/index.ts'

const objByKey = (obj: Obj, filter: Array<string>): Obj => filter.reduce((acc, curr) => ({ ...acc, [curr]: obj[curr] }), {})

export default {
  objByKey,
}
