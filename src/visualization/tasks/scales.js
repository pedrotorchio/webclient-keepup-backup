import { timeExtent, round, format } from '@/visualization/utils/time';
import { scaleTime, scaleLinear, scaleSequential, scaleBand } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';

const independencyExtent = [1, 7];
const independencyRange  = ['#f44336', '#2196f3'];
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
export function getDurationScale(tasks, range) {

  let extent = taskExtent(tasks);

  return scaleLinear()
    .domain(extent)
    .range(range);
}

export class Scales {
  constructor(tasks = []) {
    this.maxHeight = 64;
    this.minHeight = 32;

    this.padding = 5;
    this.tasks = tasks;
    
    const emptyCategory = {
      id: 0,
      title: 'Outros'
    }
    const categories = this.tasks.map( task => task.category || emptyCategory ); // categories
    const titles     = this.tasks.map( task => task.title || "Sem Nome" ); // titles
    
    // Finders:: ( static element ) => ( variable element ) => equality definition
    // by same id
    const idFinder = a => b => a.id == b.id;
    // by same value
    const valFinder = a => b => a == b;
    // unique elements:: ( static equality finder ) => ( variable element, index, whole array ) => is first equal element with same index
    const unique = finder => (el, i, arr) => arr.findIndex(finder(el)) === i;
    
    // unique categories
    this.categories = categories.filter( unique(idFinder));
    //unique titles
    this.titles = titles.filter( unique(valFinder));

    if (this.tasks.length != 0)
      this.timeExtent = taskExtent(this.tasks);
    else 
      this.timeExtent = [];
  }

  hasTasks() {
    return this.tasks.length > 0;
  }
  setCanvasWidth(width) {
    this.width = width;
  }
  setCanvasHeight(height) {
    this.height = height;
  }

  getMomentScale() {
    
    return scaleTime()
      .domain(this.timeExtent)
      .range([0, this.width]);
  }
  getHeightScale() {
    // const split = this.height / this.categories.length;
    // const height = Math.min(Math.max(split, this.minHeight), this.maxHeight);
    const height = this.minHeight;
    
    return () => height + this.padding * 2;
  }
  makeScaleBand(domain, rowSize, padding = 0) {
    
    const extent = [0, rowSize * domain.length];

    return scaleBand()
            .paddingInner(0)
            .domain(domain)
            .range(extent);

  }
  getTypeScale() {
    const heightScale = this.getHeightScale();
    
    return this.makeScaleBand(this.titles, heightScale(), this.padding);
  }
  getCategoryScale() {
    // sorted tasks
    // unique category
    
    const heightScale = this.getHeightScale();
    
    return this.makeScaleBand(this.categories, heightScale(), this.padding);
  }
  getColorScale([ start, end ]) {
    return scaleSequential( interpolateRgb( start, end ) );
  }
  getIndependencyScale() {
    
    return this.getColorScale( [ independencyRange[0], independencyRange[1] ] )
      .domain([independencyExtent[0], independencyExtent[1]]);
  
  }
  getDurationScale() {
  
    const [a, b] = this.timeExtent;
    const span   = (b-a)/60000;
    const scale = scaleLinear()
                    .domain([0, span])
                    .range([0, this.width]);

    return ( x ) => Math.floor(scale(x));
  }
}