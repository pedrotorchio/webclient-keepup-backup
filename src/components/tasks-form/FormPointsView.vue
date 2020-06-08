<script>
import { getSumationFromTask } from './FormPointsController';

export default {
    computed: {
        points() {
            return this.form.tasks.reduce( (points, task) => {

                return points + getSumationFromTask(task)

            }, 0);
        }
    }
}
</script>
