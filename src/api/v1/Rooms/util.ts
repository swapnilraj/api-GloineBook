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
        const table = $('tr').eq(3).children('td').html().split('\n')[2];
        const bookedSlots = parseTable(table);
        console.log(startDate + bookedSlots);
        return table;
    } catch(err) {
        console.log(err);
    }
    
    return null;
};

//Function temporary state

const parseTable = (table: string) => {
    const $ = cheerio.load(table);
    //let bookedSlots = null;
    $('td').each(function(_index, elm) {
        const $$ = cheerio.load(elm);
        if($$('td').attr('bgcolor') === '#ffffff') {
            console.log('key');
        } else {
            console.log('value');
        }
    });
    return null;
};