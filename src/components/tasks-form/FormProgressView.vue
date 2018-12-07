<script>
import { getSumationFromTask } from './FormPointsController';

export default {
    computed: {
        formPoints() {
            return getSumationFromTask(this.task);

        },
        progress() {
            return this.formPoints * 100 / this.maxPoints;
        },
        maxPoints() {
            
            return getSumationFromTask();
        }
    }
}
</script>
