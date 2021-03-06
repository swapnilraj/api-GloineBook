/**
 * Utility services mainly web scarping
 */

import {
  userData,
  checkAvailability,
  bookRoom as bookRoomApi,
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

export const bookRoom = async (url: string,
    credentials: string,
    time: number,
    date: number,
    month: number,
    year: number) => {
    try {
        const response = await bookRoomApi(url, credentials, time, date, month, year);
        const document: string = response as string;
        const $ = jsdom.jsdom(document);
        const bookingMessage = ($.querySelector('body font') as Element).textContent;
        return bookingMessage;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getRoomData = async (url: string, credentials: string, roomNumber: number, _startDate: number) => {
    try{
        const response = await checkAvailability(url, credentials, roomNumber);
        const document: string = response.data as string;
        const $ = jsdom.jsdom(document);
        const table = $.querySelector('body > center:nth-child(7) > table > tbody > tr > td:nth-child(1) > center > table') as HTMLTableSectionElement;
        return parseTable(table, roomNumber);
    } catch(err) {
        console.log(err);
    }
    return null;
};

export const flattenBookings = (acc: {}, obj: {k: any[]}) => {
  return Object.entries(obj)
    .reduce((inAcc, [key, val]) => ({
      ...inAcc,
      [key]: inAcc[key] ? [...inAcc[key], ...val] : val
    }), acc)
}

//Function temporary state

const parseTable = (table: HTMLTableSectionElement, room: number) => {
    const rows = Array.from(table.rows);
    const dates = rows.map((row, i) => ({ elem: row, index: i })).filter(row => row.elem.querySelector('td[bgcolor="#ffffff"]') !== null);
    return clean(combine(rows, dates), room);
};

const combine = (rows: HTMLElement[], dates: {
    elem: HTMLElement;
    index: number;
}[]) => {
    return dates.map(date => {
        const bookings = rows[date.index + 1];
        return Object.assign(date, {
            bookings: bookings.querySelector('font') as HTMLElement,
        });
    });
};

const clean = (values: {
    elem: HTMLElement;
    index: number;
    bookings: HTMLElement;
}[], room: number) => {
  return values.reduce((acc, group) => Object.assign(acc, parseGroup(room, group)), {});
};

const parseGroup = (room: number, group) => {
  const date = parseHeader(group.elem);
  const bookings = group.bookings.textContent.split('] ').map(booking => parseBooking(room, booking)).filter(e => !!e) as {
        time: string;
        name: string;
        year: string;
    }[];

  return { [date]: bookings };
};

const parseHeader = (el: HTMLElement) => {
  const val = el.querySelector('strong') as HTMLElement;
  const content = val.textContent as string;
  return content.slice(0, content.indexOf('(') - 1);
};

const parseBooking = (room: number, booking: string) => {
  const val = booking.trim();

  if (val === '') {
      return null;
  }

  const yearStart = val.indexOf('[');
  const time = val.substring(0, 11);
  const name = val.slice(12, yearStart - 1);
  const year = val.slice(yearStart + 1);

  return { time, name, year, room };
};
