/**
 * Makes HTTP requests to SCSS server
 */

'use strict';

import * as querystring from 'querystring';
import axios from 'axios';

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
    const authOptions = {
        method: 'POST',
        url: url + roomNumber + '.pl',
        headers: {
             'Authorization': 'Basic ' + credentials,
        },
        json: true,
    };

    return axios(authOptions);
};

export const bookRoom = async (
    url: string,
    credentials: string,
    time: number,
    date: number,
    month: number,
    year: number): Promise<string> => {

    const data = querystring.stringify({
     'Fullname': 'wabbalabbadubdub',
     'StartTime': time,
     'EndTime': time + 1,
     'StartDate': date,
     'StartMonth': month,
     'StartYear': year,
    });

    const opts = {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
        },
        url,
        data,
        responseType: 'text',
    };

    return axios(opts)
        .then(response => response.data)
        .catch(err => {
            console.log(err);
            return '';
        });
};
