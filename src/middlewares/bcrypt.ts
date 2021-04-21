import { errors } from '../helpers/index.ts'
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.2.3/mod.ts'

export default class Bcrypt {

  public static async hash(value: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10)

      if (!salt) throw errors.failSalt

      const hash = await bcrypt.hash(value, salt)

      if (!hash) throw errors.failCryptPwd

      return hash
    } catch(e) {
      throw e
    }
  }

  public static async compare(value: string, hash: string): Promise<boolean> {

    try {
      const isMatched = await bcrypt.compare(value, hash)

      if (!isMatched) throw errors.noMatchPwd

      return isMatched
    } catch(e) {
      throw e
    }
  }

}
