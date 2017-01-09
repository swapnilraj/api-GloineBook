/**
 * Room routes
 */

import {
  IRouteConfiguration,
} from 'hapi';

import * as Joi from 'joi';

import {
  prefixRoutes,
} from '../../../server/utils';

import handlers from './handlers';

const routes: IRouteConfiguration[] = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.getUsers,
  },
  {
    method: 'POST',
    path: '/getinfo',
    config: {
      validate: {
        payload: {
          credentials: Joi.string().required().description('Encoded credentials of the user'),
        },
      },
    },
    handler: handlers.getinfo,
  },
];

export default prefixRoutes('rooms', routes);