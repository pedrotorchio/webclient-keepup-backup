import { parseDatetime } from './time';

export const taskParser = routine => task => {
  const timestring = `${task.time} ${routine.date}`;
  const moment = parseDatetime(timestring, true);
  
  task.start = moment.toDate();
  task.end   = moment.add(task.duration, 'm').toDate();
  
  return task;
}
export function taskChopper( task ) {
  if ( task.start.getDate()  )
  const  = new Date(), e = new Date(d);
  var msSinceMidnight = e - d.setHours(0,0,0,0);
}