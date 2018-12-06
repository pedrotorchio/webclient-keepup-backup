export function getFieldPointing(fieldName) {
    let multiplier = 1;
    const base = 100;

    switch (fieldName) {
        case 'independency':
            multiplier = 2;
        break;
        
        case 'location':
            multiplier = 1.6;
        break;
        
        case 'company':
            multiplier = 1.3;
        break;
        
        case 'simultaneous_task':
            multiplier = 1.3;
        break;
    }

    return base * multiplier;
}