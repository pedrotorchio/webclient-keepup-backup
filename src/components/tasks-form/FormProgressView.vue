<script>
import { getFieldPointing, fieldNames, getSumationFromField } from './FormPointsController';

export default {
    computed: {
        formPoints() {
            return getSumationFromField(field => this.task[field]);

        },
        progress() {
            return this.formPoints * 100 / this.maxPoints;
        },
        maxPoints() {
            
            return getSumationFromField();
        }
    }
}
</script>
