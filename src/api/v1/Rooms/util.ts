/**
 * Utility services mainly web scarping
 */

import {
  userData,
  checkAvailability,
} from './controller';

import cheerio from 'cheerio';

export const getUserData = async (url: string, credentials: string) => {
    try{
      const response = await userData(url, credentials);
      let $ = cheerio.load(response);
    } catch(err) {
      console.log(err);
    }

    return null;
};

export const getRoomData = async (url: string, credentials: string, roomNumber: number) => {
    try{
      const response = await checkAvailability(url, credentials, roomNumber);
      let $ = cheerio.load(response);
    } catch(err) {
      console.log(err);
    }

    return null;
};