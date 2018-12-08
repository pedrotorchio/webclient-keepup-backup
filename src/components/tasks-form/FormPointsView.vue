<script>
import { getFieldPointing } from './FormPointsController';

export default {
    computed: {
        points() {
            return this.form.tasks.reduce( (points, task) => {

                // sum points for each field in a task
                const fields = ['company', 'duration', 'independency', 'location', 'simultaneous_task', 'title', 'time'];
                const taskPoints = fields.reduce( ( fieldSum, fieldName ) => fieldSum + getFieldPointing(fieldName, task[fieldName]), 0);
                
                return points + taskPoints;

            }, 0);
        }
    }
}
</script>
