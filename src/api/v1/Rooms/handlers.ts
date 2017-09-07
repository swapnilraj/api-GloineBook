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
  bookRoom,
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

  check: async (request: Request, reply: IReply) => {
    const roomData = await getRoomData(
      'https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr',
      request.query.credentials,
      request.query.roomNumber,
      request.query.startDate,
    );

    reply (roomData || {});
  },

  all: async (request: Request, reply: IReply) => {
    const baseURL = 'https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr';
    const promises = Array
      .from({length: 9})
      .map((_, i) => getRoomData(baseURL, request.query.credentials, i + 1, request.query.startDate));

    const data = await Promise.all(promises);
    const res = data.reduce((acc, datum) => Object.assign(acc, datum), {});
    reply(res || {});
  },

  book: async (request: Request, reply: IReply) => {
    const baseURL = `https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr${request.query.room}.request.pl`;
    Object.assign(request.query, {
      ...request.query,
      time: request.query.time + 1,
      year: request.query.year - new Date().getFullYear() + 1,
    });

    const {
      credentials,
      time,
      date,
      month,
      year,
    } = request.query;

    const confirmation = await bookRoom(baseURL, credentials, time, date, month, year);
    reply(confirmation || {});
  },
};

export default handlers;