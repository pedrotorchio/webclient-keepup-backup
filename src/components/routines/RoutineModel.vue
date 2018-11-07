<script>
import { now } from '@/visualization/utils/date';

export default {
  data: () => ({
    title: '',
    comment: '',
    date: now(),
    activities: []
  })
}
</script>
