/**
 * @param status - The status of the request
 * @param message - A message with information about the request
 * @param msgKey - A message key error for the front
 * @param token - The token to store user data
 * @param data - The data returned from the database
*/

type Response = {
  status: number;
  message: string;
  msgKey: string;
  token?: string;
  data?: Record<string, unknown>;
}

export default Response
