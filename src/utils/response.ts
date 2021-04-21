import { errors } from '../helpers/index.ts'
import { Response } from '../contracts/types/index.ts'
import { Context } from 'https://deno.land/x/oak@v6.5.0/mod.ts'
import { config } from 'https://deno.land/x/dotenv@v2.0.0/mod.ts'

const CONF = config()

export default (ctx: Context, res: Response): Response => {

  /* error */

  if (res instanceof Error && res.name === 'ValidationError') { /* yup */
    const error = res.message as unknown as Response
    if (CONF.ENV === 'development') console.error(`\n${res.name}: `, error.message, '\n')
    ctx.response.status = error.status
    return ctx.response.body = error
  }

  if (res instanceof Error && res.name === 'CustomError') { /* handle */
    const error = res as unknown as Response
    if (CONF.ENV === 'development') console.error('\n', res, '\n')
    ctx.response.status = error.status
    return ctx.response.body = error
  }

  if (res instanceof Error) { /* unhandle */
    console.error('\n', res, '\n')
    ctx.response.status = errors.serverError.status
    return ctx.response.body = errors.serverError
  }

  /* success */

  ctx.response.status = res.status
  return ctx.response.body = res

}
