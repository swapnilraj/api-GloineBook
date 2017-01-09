/**
 * Makes HTTP requests to SCSS server
 */

'use strict';

import * as axios from 'axios';

export const userData = (url: string, credentials: string) => {
    const authOptions = {
      method: 'POST',
      url: url,
      headers: {
          'Authorization': 'Basic ' + credentials,
      },
      json: true,
    };
    return axios(authOptions); 
};

export const checkAvailability = (url: string, credentials: string, roomNumber: number) => {
    var authOptions = {
      method: 'POST',
      url: url + roomNumber + '.pl',
      headers: {
          'Authorization': 'Basic ' + credentials,
      },
      json: true,
    };

    return axios(authOptions); 
};


