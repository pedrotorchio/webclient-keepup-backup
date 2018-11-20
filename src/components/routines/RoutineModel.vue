<script>
import { now } from '@/visualization/utils/date';
import Model from '@/components/generic/model/Model';

export default {
  extends: Model,
  data: () => ({
    routine: {},
    tasks: [],
    forms: []
  })
}
</script>
