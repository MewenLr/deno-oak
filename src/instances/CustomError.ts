export default class CustomError extends Error {

  public status: number
  public msgKey: string

  constructor({ status, message, msgKey }: { status: number, message: string, msgKey: string }) {

    super()

    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    this.msgKey = msgKey;
    this.status = status;
    this.message = message;

  }

}
