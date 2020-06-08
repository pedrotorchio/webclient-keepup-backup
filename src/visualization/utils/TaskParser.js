import { parseDatetime, isSameDay } from './time';

export const taskParser = routine => task => {
  const timestring = `${task.time} ${routine.date}`;
  const moment = parseDatetime(timestring, true);
  
  task.start = moment.toDate();
  task.end   = moment.add(task.duration, 'm').toDate();
  
  return task;
}
export function taskChopper( task ) {
  if ( !isSameDay(task.start, task.end) ) {

    task.chopped = new Date(task.end);

    // task.end.setDate(task.start.getDate());
    task.end.setHours(0, 0, 0, 0);
    task.end.setHours(0, 0, 0, -1);
    task.duration = Math.floor (( task.end.getTime() - task.start.getTime() ) / ( 1000 * 60 ));
    
  } else

    task.chopped = false;

  return task;
}