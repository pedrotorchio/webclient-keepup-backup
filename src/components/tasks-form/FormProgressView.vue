<script>
import { getSumationFromTask } from './FormPointsController';

export default {
    data: () => ({
        scoreAnimation: false
    }),
    computed: {
        formPoints() {
            return getSumationFromTask(this.task);

        },
        progress() {
            return this.formPoints * 100 / this.maxPoints;
        },
        maxPoints() {
            
            return getSumationFromTask();
        },
    },
    methods: {
        scoreAnimate() {
            this.scoreAnimation = true;
            setTimeout( () => this.scoreAnimation = false, 500 );
        }
    },
    watch: {
        formPoints() {
            if (this.shown)
                this.scoreAnimate();
        }
    }
}
</script>
