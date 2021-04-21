import { errors } from '../../helpers/index.ts'
import { Obj } from '../../contracts/types/index.ts'
import { User } from '../../contracts/models/index.ts'
import { Jwt, Bcrypt } from '../../middlewares/index.ts'
import { Context } from 'https://deno.land/x/oak@v6.5.0/mod.ts'
import { Status } from 'https://deno.land/std@0.84.0/http/http_status.ts'
import { filters, queries, request, response, uniqueness  } from '../../utils/index.ts'
import { userLoginValidator, userRegisterValidator, userUpdateValidator, userUpdatePwdValidator } from '../../schemas/user/User.ts'

export default class UserController {

  public static registerUser = async (ctx: Context): Promise<void> => {

    try {
      const newUser = await request(ctx)

      await userRegisterValidator.validate(newUser)

      await uniqueness('users', [{ username: newUser.username }, { email: newUser.email }])

      newUser.password = await Bcrypt.hash(newUser.password as string)

      await queries.insertOne('users', newUser)

      response(ctx, {
        status: Status.Created,
        message: 'User created',
        msgKey: 'server.success.userCreated',
      })

    } catch (e) {
      response(ctx, e)
    }
  }

  public static loginUser = async (ctx: Context): Promise<void> => {

    try {
      const user = await request(ctx)

      await userLoginValidator.validate(user)

      const userFound = await queries.findOne('users', { username: user.username })

      await Bcrypt.compare(user.password as string, userFound.password)

      const token = await Jwt.create({ _id: userFound._id })

      response(ctx, {
        status: Status.OK,
        token: `JWT ${token}`,
        message: 'User logged in with jwt',
        msgKey: 'server.success.userLoggedin',
      })

    } catch (e) {
      response(ctx, e)
    }
  }

  public static getUser = (ctx: Context): void => {

    const user: User = ctx.state?.user

    const data: Obj = filters.objByKey(user as unknown as Obj, ['_id', 'username', 'email'])

    response(ctx, {
      data,
      status: Status.OK,
      message: 'User found',
      msgKey: 'server.success.userFound',
    })
  }

  public static updateUser = async (ctx: Context): Promise<void> => {

    try {
      const update = await request(ctx)

      await userUpdateValidator.validate(update)

      const { username }: User = ctx.state?.user

      if (update.username) await uniqueness('users', [{ username: update.username }])

      if (update.email) await uniqueness('users', [{ email: update.email }])

      await queries.updateOne('users', { username }, update)

      response(ctx, {
        status: Status.OK,
        message: 'User updated',
        msgKey: 'server.success.userUpdated',
      })

    } catch (e) {
      response(ctx, e)
    }
  }

  public static updatePassword = async (ctx: Context): Promise<void> => {

    try {
      const update = await request(ctx)

      if (update.newPassword !== update.confirmNewPassword) throw errors.noMatchConfirmNewPwd

      await userUpdatePwdValidator.validate(update)

      const user: User = ctx.state?.user

      const { password: hashCurrentPwd } = await queries.findOne('users', { username: user.username })

      await Bcrypt.compare(update.password as string, hashCurrentPwd)

      const hashNewPassword = await Bcrypt.hash(update.newPassword as string)

      await queries.updateOne('users', { username: user.username }, { password: hashNewPassword })

      response(ctx, {
        status: Status.OK,
        message: 'Password updated',
        msgKey: 'server.success.userPwdUpdated',
      })

    } catch (e) {
      response(ctx, e)
    }
  }

  public static deleteUser = async (ctx: Context): Promise<void> => {

    try {
      const { username }: User = ctx.state?.user

      await queries.deleteOne('users', { username })

      response(ctx, {
        status: Status.OK,
        message: 'User deleted',
        msgKey: 'server.success.userDeleted',
      })

    } catch (e) {
      response(ctx, e)
    }
  }

}
