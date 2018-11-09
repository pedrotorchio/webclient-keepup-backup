import { timeExtent, round, format } from '@/visualization/utils/time';
import { scaleTime, scaleLinear, scaleSequential, scaleBand } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';

const independencyExtent = [1, 7];
const independencyRange  = ['red', 'blue'];
const minHeight = 32;

export function taskExtent([fst, ...rst]) {

  let extent  = [fst, rst.pop()];
  let rounded = [round(extent[0].start), round(extent[1].end, 'up')];

  return rounded;
}
export function timescale(tasks, range) {
  
  let extent = taskExtent(tasks);
  
  return scaleTime()
    .domain(extent)
    .range(range);
}
export function height(tasks, range) {
  
  // Math.max(minHeight, )
}
export function categoryScale(tasks, range) {
  // sorted tasks
  // unique category
  
  const uniques = tasks.map( task => task.category ) // categories
                       .filter( ( category, i, categories ) => categories.findIndex(
                                  category2 => category.id === category2.id) === i );
  
  return scaleBand()
      .domain(uniques)
      .range(range);
}
export function independencyScale() {
  
  return scaleSequential( interpolateRgb(independencyRange[0], independencyRange[1]) )
    .domain([independencyExtent[0], independencyExtent[1]]);

}
export function durationScale(tasks, range) {

  let extent = taskExtent(tasks);

  return scaleLinear()
    .domain(extent)
    .range(range);
}

export class Scales {
  constructor(tasks, width, height) {
    this.maxHeight = 64;
    this.minHeight = 32;

    this.padding = 5;

    this.tasks = tasks;
    this.width = width;
    this.height = height;

    const categories = this.tasks.map( task => task.category ); // categories
    
    const idFind = id => el => el.id == id;
    const unFind = finder => (el, i, arr) => arr.findIndex(idFind(el.id)) === i;

    this.categories = categories.filter( unFind(idFind));
    this.timeExtent = taskExtent(this.tasks);
    

  }

  getMomentScale() {
    
    return scaleTime()
      .domain(this.timeExtent)
      .range([0, this.width]);
  }
  getHeightScale() {
    const split = this.height / this.categories.length;
    const height = Math.min(Math.max(split, this.minHeight), this.maxHeight);
    
    return () => height;
  }
  getCategoryScale() {
    // sorted tasks
    // unique category
    
    const heightScale = this.getHeightScale();
    const ids = this.categories.map(cat => cat.id);
    const height = (heightScale() + this.padding * 2) * this.categories.length;

    return scaleBand()
        .padding(this.padding)
        .domain(ids)
        .range([0, height]);
  }
  getIndependencyScale() {
    
    return scaleSequential( interpolateRgb(independencyRange[0], independencyRange[1]) )
      .domain([independencyExtent[0], independencyExtent[1]]);
  
  }
  getDurationScale() {
  
    const [a, b] = this.timeExtent;
    const span   = (b-a)/60000;
    
    return scaleLinear()
      .domain([0, span])
      .range([0, this.width]);
  }
}