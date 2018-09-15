import { timescale } from '@/visualization/tasks/timescale';

describe('visualization', () => {


  it ('calcula escala de tempo correta', () => {

    /**
     * Domínio das 06:30 às 23:40 será convertido para 06:00 às 00:00, totalizando 18 horas
     * Range será a largura total disponível, aqui 900px
     * Dessa forma, cada hora ocupará 50px
     */
    
    const domain = [{time: '23:40', time: '06:30'}];
    const range  = [0, 900];

    const scale  = timescale(domain, range);
    
    expect(scale(1)).toBe(50);
  })
});