/**
 * Room route handlers
 */

import {
  Request,
  IReply,
} from 'hapi';

import * as axios from 'axios';

const handlers = {
  getUsers: (request: Request, reply: IReply) => {
    reply(request.query);
  },

  getinfo: (request: Request, reply: IReply) => {
    console.log(request.payload);

    var authOptions = {
      method: 'POST',
      url: 'https://www.scss.tcd.ie/cgi-bin/webcal/sgmr/sgmr3.cancel.pl',
      headers: {
          'Authorization': 'Basic ' + request.payload.credentials,
      },
      json: true,
    };

    axios(authOptions)
      .then(function(response){
        console.log(response);
      })
      .catch(function(err){
        console.log(err);
      }
      ); 

    reply({ success: true });
    
  },
};

export default handlers;