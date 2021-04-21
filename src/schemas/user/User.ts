import * as yup from 'https://cdn.skypack.dev/yup@0.32.9'
import { validators } from '../../helpers/index.ts'

export const userRegisterValidator = yup.object().shape({
  username: validators.yupUsername(true),
  password: validators.yupPassword(true, 'password'),
  email: validators.yupEmail(true),
})

export const userLoginValidator = yup.object().shape({
  username: validators.yupUsername(true),
  password: validators.yupPassword(true, 'password'),
})

export const userUpdateValidator = yup.object().shape({
  username: validators.yupUsername(false),
  email: validators.yupEmail(false),
})

export const userUpdatePwdValidator = yup.object().shape({
  password: validators.yupPassword(true, 'password'),
  newPassword: validators.yupPassword(true, 'newPassword'),
  confirmNewPassword: validators.yupPassword(true, 'confirmNewPassword'),
})
