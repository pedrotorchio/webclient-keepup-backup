import { parseDatetime } from './time';

export const taskParser = routine => task => {
  const timestring = `${task.time} ${routine.date}`;
  const moment = parseDatetime(timestring, true);
  
  task.start = moment.toDate();
  task.end   = moment.add(task.duration, 'm').toDate();
  
  return task;
}