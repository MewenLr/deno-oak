import Server from './server.ts'
import config from './config/parameters.ts'

// process.on('unhandledRejection', e => console.error(e))
// process.on('uncaughtException', e => console.error(e.stack || e))

class Services {

  public static server = (): void => {
    const server = new Server(config)
    server.initiate().listen()
  }

}

export default Services.server()
