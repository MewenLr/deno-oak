export default class ValidationError extends Error {

  constructor(...params: string[]) {

    super(...params);

    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = 'ValidationError';
  }

}
