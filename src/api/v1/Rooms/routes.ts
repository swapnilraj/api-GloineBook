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
    path: '/getinfo',
    config: {
      validate: {
        query: {
          credentials: Joi.string().description('Encoded credentials of the user'),
        },
      },
    },
    handler: handlers.getinfo,
  },
  {
    method: 'GET',
    path: '/check',
    config: {
      validate: {
        query: {
          credentials: Joi.string().description('Encoded credentials of the user'),
          roomNumber: Joi.number().required().integer().min(1).max(9).description('Number of the room to check availability against'),
          startDate: Joi.number().integer().description('Date to check availability against'),
        },
      },
    },
    handler: handlers.check,
  },
  {
    method: 'GET',
    path: '/all',
    config: {
      validate: {
        query: {
          credentials: Joi.string().description('Encoded credentials of the user'),
          startDate: Joi.number().integer().description('Date to check availability against'),
        },
      },
    },
    handler: handlers.all,
  },
  {
    method: 'GET',
    path: '/echo',
    handler: (request, reply) => {
      reply(request.query);
    },
  },
];

export default prefixRoutes('rooms', routes);