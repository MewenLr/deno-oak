import config from '../config/parameters.ts'
import { errors, regex } from '../helpers/index.ts'
import { queries, response } from '../utils/index.ts'
import { Bson } from 'https://deno.land/x/mongo@v0.22.0/mod.ts'
import { Context } from 'https://deno.land/x/oak@v6.5.0/mod.ts'
import { create as jwtCreate, verify as jwtVerify } from 'https://deno.land/x/djwt@v2.2/mod.ts'

export default class JWT {

  static async create (payload: { _id: Record<string, unknown> }): Promise<string> {
    try {
      const jwt = await jwtCreate({ alg: 'HS512', typ: 'JWT' }, payload, config.jwtSecret)

      if (!jwt) throw false

      return jwt
    } catch(e) {
      throw errors.failJwtCreation
    }
  }

  static async verify (ctx: Context, next: () => unknown): Promise<void> {
    try {
      const authorization = ctx.request.headers.get('Authorization')

      if (!authorization || !regex.jwt.test(authorization)) throw errors.unauthorized

      const token = authorization.split(' ')[1]

      if (!token) throw errors.unauthorized

      const payload = await jwtVerify(token, config.jwtSecret, 'HS512')

      if (!payload) throw errors.noJwtPayload

      ctx.state.user = await queries.findOne('users', { _id: new Bson.ObjectId(payload._id) })

      if (!ctx.state.user) throw errors.noDocFound

      await next()
    } catch(e) {
      if (e.name === 'CustomError') response(ctx, e)
      else response(ctx, errors.failJwtVerification)
    }
  }

}
