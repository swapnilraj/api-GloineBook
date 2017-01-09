/**
 * Room route handlers
 */

import {
  Request,
  IReply,
} from 'hapi';

import {
  getRoomData,
  getUserData,
} from './util';


const handlers = {

  getinfo: async (request: Request, reply: IReply) => {
    console.log(request.payload);
    getUserData('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr3.cancel.pl', request.payload.credentials);
  },

  checkAvailability: async (request: Request, reply: IReply) => {
    console.log(request.payload);
    getRoomData('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr', request.payload.credentials, request.payload.roomNumber);
  },
};

export default handlers;