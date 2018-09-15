import { timeExtent, round, format } from '@/visualization/utils/time';
import { scaleTime } from 'd3-scale';

export function timescale(tasks, range) {
  
  let [min, max] = timeExtent(tasks);
  
  let rounded = [round(min), round(max, 'up')];

  return scaleTime()
    .domain(rounded)
    .range(range);
}