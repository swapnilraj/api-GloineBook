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
          room: Joi.number().required().integer().min(1).max(9).description('Number of the room to check availability against'),
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
    path: '/book',
    config: {
      validate: {
        query: {
          credentials: Joi.string().required().description('Encoded credentials of the user'),
          room: Joi.number().required().integer().min(1).max(9).description('Number of the room to book'),
          time: Joi.number().required().integer().min(0).max(23).description('Start time for booking'),
          date: Joi.number().required().integer().min(1).max(31).description('Start date for booking'),
          month: Joi.number().required().integer().min(1).max(12).description('Start month for booking'),
          year: Joi.number().required().integer().min((new Date().getFullYear())).max((new Date().getFullYear() + 1)).description('Start year for booking'),
        },
      },
    },
    handler: handlers.book,
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