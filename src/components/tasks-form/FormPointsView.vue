<script>
import { getFieldPointing } from './FormPointsController';

export default {
    data: () => ({
        points: 0,
    }),
    methods: {
        fieldChanged(fieldName) {
            this.points += getFieldPointing(fieldName);
        }
    }
}
</script>
