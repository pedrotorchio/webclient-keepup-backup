export function getIndependencyLabel(independency) {
  let level = '';
  switch( independency ) {
    case 1: level = 'Inexistente';
    break;
    case 2: level = 'Baixíssima';
    break;
    case 3: level = 'Insuficiente';
    break;
    case 4: level = 'Baixa';
    break;
    case 5: level = 'Regular';
    break;
    case 6: level = 'Boa';
    break;
    case 7: level = 'Completa';
    break;

    default: level = 'Desconhecido';
    break;
  }

  return level;
}