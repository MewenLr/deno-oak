import Router from './router/index.ts'
import Snelm from './middlewares/snelm.ts'
import { oakCors } from 'https://deno.land/x/cors@v1.2.0/mod.ts'
import { ConfigServer } from './contracts/types/index.ts'
import { Router as OakRouter, Application } from 'https://deno.land/x/oak@v6.5.0/mod.ts'

export default class Server {

  protected port: number
  protected dbUri: string
  protected app: Application

  constructor(config: ConfigServer) {
    this.port = config.port
    this.dbUri = config.dbUri
    this.app = new Application()
  }

  protected router(): Server {
    Router.publicRouters.forEach((router: OakRouter) => this.app.use(router.routes()).use(router.allowedMethods()))
    Router.privateRouters.forEach((router: OakRouter) => this.app.use(router.routes()).use(router.allowedMethods()))
    return this
  }

  protected middleware(): Server {
    // this.app.use(Snelm.init())
    this.app.use(oakCors())
    return this
  }

  public initiate(): Server {
    this.middleware()
    this.router()

    return this
  }

  public async listen(): Promise<Application> {
    await this.app.listen({ port: this.port })
    console.info(`\n[info] Server start on port: ${this.port}\n`)
    return this.app
  }

}
