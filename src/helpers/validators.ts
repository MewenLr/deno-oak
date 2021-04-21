import * as yup from 'https://cdn.skypack.dev/yup@0.32.9'
import { regex } from './index.ts'
import { errors } from './index.ts'

export default {

  yupUsername: (required: boolean) => required ? yup
    .string().typeError(() => errors.wrongUsername)
    .required(() => errors.requiredField('username'))
    .matches(regex.username, () => errors.wrongUsername)
  : yup
    .string().typeError(() => errors.wrongUsername)
    .matches(regex.username, () => errors.wrongUsername),

yupPassword: (required: boolean, key: string) => required ? yup
    .string().typeError(() => errors.wrongPassword(key))
    .required(() => errors.requiredField(key))
    .matches(regex.password, () => errors.wrongPassword(key))
  : yup
    .string().typeError(() => errors.wrongPassword(key))
    .matches(regex.password, () => errors.wrongPassword(key)),

yupEmail: (required: boolean) => required ? yup
    .string().typeError(() => errors.wrongEmail)
    .matches(regex.email, () => errors.wrongEmail)
    .required(() => errors.requiredField('email'))
  : yup
    .string().typeError(() => errors.wrongEmail)
    .matches(regex.email, () => errors.wrongEmail),

}
