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
  {
    method: 'POST',
    path: '/checkAvailability',
    config: {
      validate: {
        payload: {
          credentials: Joi.string().required().description('Encoded credentials of the user'),
          roomNumber: Joi.number().integer().min(1).max(9).description('Number of the room to check availability against'),
        },
      },
    },
    handler: handlers.checkAvailability,
  },
];

export default prefixRoutes('rooms', routes);