import { timescale } from '@/visualization/tasks/timescale';
import { parseTime, timeExtent, format, round } from '@/visualization/utils/time';

describe('Time visualization', () => {

  it ('interpreta string de tempo corretamente', () => {
    const hh = 10;
    const mm = 32;
    const date = parseTime(`${hh}:${mm}`);
    
    expect(date.getHours()).toBe(hh);
    expect(date.getMinutes()).toBe(mm);

  });

  it ('extrái objeto date para string de tempo', () => {
    const hh = 10;
    const mm = 32;
    const date = parseTime(`${hh}:${mm}`);

    const string = format(date);

    expect(string).toBe(`${hh}:${mm}`);
  })
  it ('arredonda date', () => {
    const hh = 10;
    const mm = 32;
    const date = parseTime(`${hh}:${mm}`);

    expect(format(round(date))).toBe(`${hh}:00`);
    expect(format(round(date, 'up'))).toBe(`${hh + 1}:00`);
  })

  it ( 'calcula cobertura de tempo', () => {
    /**
     * 06:30, 10:15, 23:40 deve retornar 06:30, 23:40
     */
    const times = [{ time: '23:40' }, { time: '06:30' }, { time: '10:15' }]
                    .map(task => ({ date: parseTime(task.time)}));
    const ext   = timeExtent(times);
    
    expect(format(ext[0])).toBe('06:30');
    expect(format(ext[1])).toBe('23:40');
  })
  it ( 'arredonda cobertura de tempo', () => {
    /**
     * 06:30, 10:15, 23:40 deve retornar 06:30, 23:40
     */
    const times = [{ time: '23:40' }, { time: '06:30' }, { time: '10:15' }]
                    .map(task => ({ date: parseTime(task.time)}));
    const ext   = timeExtent(times);

    round
    
    expect(format(ext[0])).toBe('06:30');
    expect(format(ext[1])).toBe('23:40');
  })
  it ('calcula escala de tempo', () => {

    /**
     * Domínio das 06:30 às 23:40 será convertido para 06:00 às 00:00, totalizando 18 horas
     * Range será a largura total disponível, aqui 900px
     * Dessa forma, cada hora ocupará 50px
     */
    
    const domain = [{ time: '23:40' }, { time: '06:30' }]
                    .map(task => ({ date: parseTime(task.time)}));
    const range  = [0, 900];
    const scale  = timescale(domain, range);

    expect(scale(parseTime('07:00'))).toBe(50);
  })
});