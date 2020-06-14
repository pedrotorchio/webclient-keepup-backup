<script>
import { TweenMax, Expo } from 'gsap';

export default {
    methods: {
        listEnter(el, done) {

            const index = el.dataset.index;
            
            if (index) {
                const delay = index * 0.1;

                TweenMax.from(el, 1, {
                    autoAlpha: 0,
                    x: -20,
                    ease: Expo.easeOut,
                    onComplete: done,
                    delay
                });
            }

        }
    }    
}
</script>
<style lang="stylus" scoped>
    .task
        visibility hidden
</style>
