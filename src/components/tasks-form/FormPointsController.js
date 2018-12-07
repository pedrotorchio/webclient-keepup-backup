export function getFieldPointing(fieldName, value) {
    let multiplier = 1;
    const base = 100;

    switch (fieldName) {
        case 'independency':
            multiplier = Boolean(value) ? 2 : 0;
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

        default:
            multiplier = Boolean(value) ? 1 : 0;
        break;
    }

    return base * multiplier;
}
export function getSumationFromField( valueExtractor = field => true ) {
    return fieldNames.reduce( (points, field) => {
        const value = valueExtractor(field);
        const fieldPoints = getFieldPointing(field, value)

        const sum = points + fieldPoints;

        console.log(field, value, fieldPoints, sum, '\n');
        return sum;
    }, 0 );
}
export const fieldNames = ['company', 'duration', 'independency', 'location', 'simultaneous_task', 'title', 'time'];