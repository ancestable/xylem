import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import configuration from './config/configuration';

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[],
): Promise<any> {

  if (securityName === 'jwt') {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers['x-access-token'];

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = await jwt.verify(token, configuration.jwtSecret);

    // Check if JWT contains all required scopes
    for (const scope of scopes) {
      if (!decoded.scopes.includes(scope)) {
        throw new Error('JWT does not contain required scope.');
      }
    }

    return decoded;
  }

  throw new Error('No matching security policy found.');
}
