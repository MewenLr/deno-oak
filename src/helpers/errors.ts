import { CustomError } from '../instances/index.ts'
import { Status } from 'https://deno.land/std@0.84.0/http/http_status.ts'

export default {

  /* server */

  serverError: new CustomError({
    status: Status.InternalServerError,
    message: 'Internal server error',
    msgKey: 'api.error.serverError',
  }),
  connectDbFail: new CustomError({
    status: Status.InternalServerError,
    message: 'Failed to connect to db',
    msgKey: 'api.error.connectDbFail',
  }),
  noDb: new CustomError({
    status: Status.InternalServerError,
    message: 'No db found',
    msgKey: 'api.error.noDb',
  }),

  /* request */

  noBody: new CustomError({
    status: Status.BadRequest,
    message: 'No data provided',
    msgKey: 'api.error.req.noBody',
  }),
  unauthorized: new CustomError({
    status: Status.Unauthorized,
    message: 'Unauthorized',
    msgKey: 'api.error.req.unauthorized',
  }),
  failJwtCreation: new CustomError({
    status: Status.BadRequest,
    message: 'Failed to create jwt',
    msgKey: 'api.error.req.failJwtCreation',
  }),
  failJwtVerification: new CustomError({
    status: Status.Unauthorized,
    message: 'Failed to verify jwt',
    msgKey: 'api.error.req.unauthorized',
  }),
  noJwtPayload: new CustomError({
    status: Status.NotFound,
    message: 'Failed to get jwt document',
    msgKey: 'api.error.req.noUserFound',
  }),
  failSalt: new CustomError({
    status: Status.InternalServerError,
    message: 'Failed to generate salt',
    msgKey: 'api.error.req.failSalt',
  }),
  failCryptPwd: new CustomError({
    status: Status.InternalServerError,
    message: 'Failed to crypt password',
    msgKey: 'api.error.req.failCryptPwd',
  }),
  noMatchPwd: new CustomError({
    status: Status.BadRequest,
    message: 'Incorrect password',
    msgKey: 'api.error.req.noMatchPwd',
  }),
  noMatchConfirmNewPwd: new CustomError({
    status: Status.BadRequest,
    message: 'New password doesn\'t match confirm new password',
    msgKey: 'api.error.req.confirmPwd',
  }),

  /* queries */

  uniqueDoc: (key: string) => (new CustomError({
    status: Status.BadRequest,
    message: `Key ${key} already exist`,
    msgKey: `api.error.queries.uniqueDoc.${key}`,
  })),
  uniqueKeyTest: new CustomError({
    status: Status.BadRequest,
    message: 'Must provide one key to test uniqueness',
    msgKey: 'api.error.queries.badRequest',
  }),
  failCountDoc: new CustomError({
    status: Status.BadRequest,
    message: 'Could not count document',
    msgKey: 'api.error.queries.badRequest',
  }),
  failInsertDoc: new CustomError({
    status: Status.BadRequest,
    message: 'Could not insert document',
    msgKey: 'api.error.queries.failInsertDoc',
  }),
  noDocFound: new CustomError({
    status: Status.NotFound,
    message: 'Document not found',
    msgKey: 'api.error.queries.notFound',
  }),
  failUpdateDoc: new CustomError({
    status: Status.BadRequest,
    message: 'Could not update document',
    msgKey: `api.error.queries.failUpdate`,
  }),

  /* validations */

  requiredField: (field: string) => ({
    status: Status.BadRequest,
    message: `Field ${field} is required`,
    msgKey: `api.error.validation.require.${field}`,
  }),
  wrongUsername: {
    status: Status.BadRequest,
    message: 'Username must be one upper case, one lower case, and between 3 and 16 characters',
    msgKey: 'api.error.validation.format.username',
  },
  wrongPassword: (field: string) => ({
    status: Status.BadRequest,
    message: `Field ${field} must be one digit, one upper case, one lower case, and between 8 and 32 characters`,
    msgKey: `api.error.validation.format.${field}`,
  }),
  wrongEmail: {
    status: Status.BadRequest,
    message: 'Wrong email format',
    msgKey: 'api.error.validation.format.email',
  },

}
