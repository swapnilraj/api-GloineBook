/**
 * Server extension
 */

import {
  Request,
  IReply,
  Server,
} from 'hapi';

import {
  CREDENTIALS,
} from './constants';

const credentialChooser = (request: Request, reply: IReply) => {
  const credentials = request.query.credentials || CREDENTIALS;

  Object.assign(request.query, {
    ...request.query,
    credentials: credentials,
  });

  return reply.continue();
};

const bindExts = (server: Server) => {
  server.ext('onPreHandler', credentialChooser);
};

export default bindExts;