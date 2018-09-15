import { timeExtent } from '@/visualization/utils/time';
import { scaleTime } from 'd3-scale';

export function timescale(tasks, range) {
  
  let domain = timeExtent(tasks);
  
  return scaleTime()
    .domain(domain)
    .range(range);
}