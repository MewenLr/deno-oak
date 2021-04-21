import { Context } from 'https://deno.land/x/oak@v6.5.0/mod.ts'
import { Snelm as OakSnelm } from 'https://deno.land/x/snelm/mod.ts'

export default class Snelm {

  public static init() {

    const snelm = new OakSnelm('oak')

    const callback = (ctx: Context, next: () => void) => {
      ctx.response = snelm.snelm(ctx.request, ctx.response)
      next()
    }

    return callback
  }
}
