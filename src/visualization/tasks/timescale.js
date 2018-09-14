import { extent } from 'd3-array';
import moment from 'moment';

export function timeExtent(array) {
  let [min, max] = extent(array, task => task.time);

  min = moment(min).startOf('hour').format('HH:mm');
  max = moment(max).endOf('hour').format('HH:mm');

  return [min, max];
}