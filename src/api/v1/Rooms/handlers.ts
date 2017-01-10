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
    const userData = await getUserData('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr3.cancel.pl', request.payload.credentials);
    if (!!userData) {
      reply ({ 'fullName': userData[0],
                'surname': userData[1],
                'year': userData[2].substring(1, userData[2].length - 1),
            });
    }
  },

  checkAvailability: async (request: Request, reply: IReply) => {
    console.log(request.payload);
    const roomData = await getRoomData('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr',
     request.payload.credentials, request.payload.roomNumber, request.payload.startDate);
    reply ({  roomData });
  },
};

export default handlers;