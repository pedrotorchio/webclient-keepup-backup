<script>
import { getFieldPointing } from './FormPointsController';

export default {
    data: () => ({
        points: 0,
    }),
    methods: {
        fieldChanged({ fieldName, value }) {
            this.points += getFieldPointing(fieldName, value);
        }
    }
}
</script>
