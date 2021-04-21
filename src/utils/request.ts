import { errors } from '../helpers/index.ts'
import { Obj } from '../contracts/types/index.ts'
import { Context } from 'https://deno.land/x/oak@v6.5.0/mod.ts'

export default async (ctx: Context): Promise<Obj> => {

  try {
    if (!ctx.request.hasBody) throw false

    const request = ctx.request.body()

    if (request.type !== "json") throw false

    const body = await request.value

    if (body && Object.keys(body).length === 0) throw false

    return body
  } catch(e) {
    throw errors.noBody
  }

}
