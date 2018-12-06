export function getFieldPointing(fieldName, value) {
    let multiplier = 1;
    const base = 100;

    switch (fieldName) {
        case 'independency':
            multiplier = 2;
        break;
        
        case 'location':
            multiplier = Boolean(value) ? 1.6 : 0;
        break;
        
        case 'company':
            multiplier = Boolean(value) ? 1.3 : 0;
        break;
        
        case 'simultaneous_task':
            multiplier = Boolean(value) ? 1.3 : 0;
        break;
    }

    return base * multiplier;
}