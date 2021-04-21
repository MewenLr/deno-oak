import config from '../../config/parameters.ts'
import { Jwt } from '../../middlewares/index.ts'
import { UserController } from '../../controllers/index.ts'
import { Context, Router } from 'https://deno.land/x/oak@v6.5.0/mod.ts'

const router = new Router()

export default class UserRoutes {

  public static publicRoutes: Router = router

    /**
    * [POST] '/user'
    * @desc create a new user
    */
    .post(
      `${config.apiVersion}/user`,
      (ctx: Context) => UserController.registerUser(ctx),
    )

    /**
    * [POST] '/user/login'
    * @desc login user
    */
     .post(
      `${config.apiVersion}/user/login`,
      (ctx: Context) => UserController.loginUser(ctx),
    )

  public static privateRoutes: Router = router

    /**
    * [GET] '/user'
    * @desc fetch user information
    */
    .get(
      `${config.apiVersion}/user`,
      Jwt.verify,
      (ctx: Context) => UserController.getUser(ctx),
    )

    /**
    * [PUT] '/user'
    * @desc update user
    */
    .put(
      `${config.apiVersion}/user`,
      Jwt.verify,
      (ctx: Context) => UserController.updateUser(ctx),
    )

    /**
    * [PUT] '/user/password'
    * @desc update user password
    */
    .put(
      `${config.apiVersion}/user/password`,
      Jwt.verify,
      (ctx: Context) => UserController.updatePassword(ctx),
    )

    /**
    * [PUT] '/user'
    * @desc update user
    */
    .delete(
      `${config.apiVersion}/user`,
      Jwt.verify,
      (ctx: Context) => UserController.deleteUser(ctx),
    )

}
