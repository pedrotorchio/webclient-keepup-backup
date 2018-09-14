import moment from 'moment';

export const dateFormats = {
  timestamp: 'YYYY-MM-DD',
  regular: 'DD/MM/YYYY'
};
export function now() {
  return moment().format(dateFormats.regular);
}
export function fromTimestamp(timestamp) {
  return moment(timestamp, dateFormats.timestamp).format(dateFormats.regular);
}
export function toTimestamp(regular) {
  return moment(regular, dateFormats.regular).format(dateFormats.timestamp);
}