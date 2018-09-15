import { extent } from 'd3-array';
import moment from 'moment';


export const timeFormats = {
  regular: 'HH:mm'
};
export function timeExtent(array) {
  let [min, max] = extent(array, task => {
    const { time, date } = task;
    let dateObj;
    if (date) {
      dateObj = new Date()
    }
  });

  min = moment(min, timeFormats.regular).startOf('hour').format(timeFormats.regular);
  max = moment(max, timeFormats.regular).add(1, 'hour').startOf('hour').format(timeFormats.regular);

  return [min, max];
}