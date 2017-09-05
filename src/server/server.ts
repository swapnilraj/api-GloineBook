/**
 * API Server definition
 */

import { Server } from 'hapi';

import config from './config';
import plugins from './plugins';
import routes from './routes';
import bindExts from './ext';

export default async (): Promise<Server> => {
  const server = new Server();

  server.connection(config);
  await server.register(plugins);
  bindExts(server);
  server.route(routes);
  return server;
};