/**
 * Room route handlers
 */

import {
  Request,
  IReply,
} from 'hapi';

import {
  getUserData,
  checkAvailability,
} from './controller';

const handlers = {

  getinfo: async (request: Request, reply: IReply) => {
    console.log(request.payload);

    try{
      const response = await getUserData('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr3.cancel.pl',
        request.payload.credentials);
        reply({ success: response.data });
    } catch(err) {
      console.log(err);
    }
  },

  checkAvailability: async (request: Request, reply: IReply) => {
    console.log(request.payload);

    try{
      const response = await checkAvailability('https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr', 
      request.payload.credentials, request.payload.roomNumber);
      reply({ success: response.data});
    } catch(err) {
      console.log(err);
    }
    
  },
};

export default handlers;