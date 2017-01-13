/**
 * Utility services mainly web scarping
 */

import {
  userData,
  checkAvailability,
} from './controller';

import * as jsdom from 'jsdom';

export const getUserData = async (url: string, credentials: string) => {
    try{
        const response = await userData(url, credentials);
        const document: string = response.data as string;
        const $ = jsdom.jsdom(document);
        const temp = $.querySelector('body > h1') as HTMLHeadingElement;
        if(!!temp && !!temp.textContent) {
            return (temp.textContent.split('for'))[1].split(' ');
        }
    } catch(err) {
        console.log(err);
        return null;
    }
};

export const getRoomData = async (url: string, credentials: string, roomNumber: number, _startDate: number) => {
    try{
        const response = await checkAvailability(url, credentials, roomNumber);
        const document: string = response.data as string;
        const $ = jsdom.jsdom(document);

        const table = $.querySelector('body > center:nth-child(7) > table > tbody > tr > td:nth-child(1) > center > table') as HTMLTableSectionElement;
        return parseTable(table);
    } catch(err) {
        console.log(err);
    }
    return null;
};

//Function temporary state

const parseTable = (table: HTMLTableSectionElement) => {

    const rows = Array.from(table.rows);
    const headers = rows.map((row, i) => ({ elem: row, index: i })).filter(row => row.elem.querySelector('td[bgcolor="#ffffff"]') !== null);
    return clean(combine(rows, headers));
};

const combine = (rows: HTMLElement[], headers: {
    elem: HTMLElement
    index: number
}[]) => {
    return headers.map(header => {
        const bookings = rows[header.index + 1];
        return Object.assign(header, {
            bookings: bookings.querySelector('font') as HTMLElement,
        });
    });
};

const clean = (values: {
    elem: HTMLElement
    index: number
    bookings: HTMLElement
}[]) => {
  return values.map(parseGroup);
};

const parseGroup = (group) => {
  const ret = {
    date: parseHeader(group.elem),
    bookings: group.bookings.textContent.split('\n').map(parseBooking) as {
        time: string
        name: string
        year: string
    }[]
  };
  return ret;
};

const parseHeader = (el: HTMLElement) => {
  const val = el.querySelector('strong') as HTMLElement;
  const content = val.textContent as string;
  return content.slice(0, content.indexOf('(') - 1);
};

const parseBooking = (booking: string) => {
  const val = booking.trim();

  const yearStart = val.indexOf('[');
  const time = val.substring(0, 11);
  const name = val.slice(12, yearStart - 1);
  const year = val.slice(yearStart);

  return { time, name, year };
};