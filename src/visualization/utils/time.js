import { extent } from 'd3-array';

import moment from 'moment';

export const timeFormats = {
  regular: 'HH:mm',
  date: 'DD/MM/YYYY'
};
export function format(date) {
  if ((!date instanceof Date))
    throw 'Not a Date';

  const string = moment(date).format(timeFormats.regular);

  return string;
}
export function parse (string, format, isMoment = false) {
  const mom = moment(string, format);
  const date = isMoment ? mom : mom.toDate();

  return date;
}
export function parseDatetime(hhmmddmmyyyy, isMoment = false) {

  return parse(hhmmddmmyyyy, `${timeFormats.regular} ${timeFormats.date}`, isMoment);
}
export function parseTime(hhmm, isMoment = false) {
  
  return parse(hhmm, timeFormats.regular, isMoment);
}
export function timeExtent(array) {
  
  let [min, max] = extent(array, task => task.start);

  return [min, max];

}
export function round(date, direction = 'down', what = 'hour') {
  let rounded;
  switch (direction) {
    case 'up':
      rounded = moment(date).add(1, what);
    break;

    case 'down':
      rounded = moment(date);
    break;

    default: 
      throw 'Invalid Operation';
  }

  return rounded.startOf(what).toDate();
}
export function roundExtent([ min, max ]) {
  min = round(min);
  max = round(max, 'up');

  return [min, max];
}

export function isSameDay( date1, date2 ) {
  const sameDay = date1.getDate() == date2.getDate();
  
  return sameDay;
}