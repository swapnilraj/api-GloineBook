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
    const userData = await getUserData('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr3.cancel.pl', request.query.credentials);
    if (!!userData) {
      reply ({ 'fullName': userData[0],
                'surname': userData[1],
                'year': userData[2].substring(1, userData[2].length - 1),
            });
    }
  },

  checkAvailability: async (request: Request, reply: IReply) => {
    const roomData = await getRoomData('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr',
     request.query.credentials, request.query.roomNumber, request.query.startDate);
    reply ({ [request.query.roomNumber] : roomData });
  },

  checkAllAvailability: async (request: Request, reply: IReply) => {
    let roomData;
    const response = {};
    for (let i = 1; i < 10; ++i) {
      roomData = await getRoomData('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr',
      request.query.credentials, i, request.query.startDate);
      Object.assign(response, { [i]: [roomData] });
    }
    reply ({ response });
  },
};

export default handlers;