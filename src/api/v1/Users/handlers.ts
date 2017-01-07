/**
 * User route handlers
 */

import {
  Request,
  IReply,
} from 'hapi';

import axios from 'axios';

const handlers = {
  getUsers: (request: Request, reply: IReply) => {
    reply(request.query);
  },

  login: (request: Request, reply: IReply) => {
    console.log(request.payload);
    var instance = axios.create({
    baseURL: 'https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr3.pl',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
    });

    instance.post('/', "");

    reply({ success: true });
  },
};

export default handlers;