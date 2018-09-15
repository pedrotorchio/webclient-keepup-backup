import { extent } from 'd3-array';

import moment from 'moment';

export const timeFormats = {
  regular: 'HH:mm'
};
export function format(date) {
  if ((!date instanceof Date))
    throw 'Not a Date';

  const string = moment(date).format(timeFormats.regular);

  return string;
}
export function parseTime(hhmm) {
  
  const date = moment(hhmm, timeFormats.regular).toDate();
  
  return date;
}
export function timeExtent(array, string = false) {
  
  let [min, max] = extent(array, task => task.date);

  return [min, max];

}
export function round(date, direction = 'down', what = 'hour') {
  let rounded = 'Invalid Operation';

  switch (direction) {
    case 'up':
      rounded = moment(date).add(1, what).startOf(what).toDate();
    break;

    case 'down':
      rounded = moment(date).startOf(what).toDate();
    break;
  }
  return rounded;
}
export function roundExtent([ min, max ]) {
  min = round(min);
  max = round(max, 'up');

  return [min, max];
}