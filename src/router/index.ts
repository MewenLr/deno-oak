import UserRoutes from './_user/_user.ts'

export default class Router {

  public static publicRouters = [
    UserRoutes.publicRoutes,
    // ...
  ]

  public static privateRouters = [
    UserRoutes.privateRoutes,
    // ...
  ]

}
