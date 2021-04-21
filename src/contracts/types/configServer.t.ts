/**
 * @param dbUri - The database uri
 * @param dbName - The database name
 * @param port - A Port to run the server on
 * @param jwtSecret - The secret JWT uses to create a signature for the payload
*/

type ConfigServer = {
  dbUri: string;
  dbName: string;
  port: number;
  jwtSecret: string;
}

export default ConfigServer
