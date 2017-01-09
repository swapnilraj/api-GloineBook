/**
 * Utility services mainly web scarping
 */

import {
  userData,
  checkAvailability,
} from './controller';

import * as cheerio from 'cheerio';

export const getUserData = async (url: string, credentials: string) => {
    try{
      const response = await userData(url, credentials);
      const document: string = response.data as any;
      const $ = cheerio.load(document);
      return $('body > h1').text().split('for')[1].split(' ');
    } catch(err) {
      console.log(err);
      return null;
    }
};

export const getRoomData = async (url: string, credentials: string, roomNumber: number, startDate: number) => {
    try{
      const response = await checkAvailability(url, credentials, roomNumber);
      const document: string = response.data as any;
      const $ = cheerio.load(document);
      console.log(document);
      const table = $('tr').text().split('\n');
      console.log('???????????? '+table[1] + "\n????????????");
      console.log(startDate);
    } catch(err) {
      console.log(err);
    }

    return null;
};