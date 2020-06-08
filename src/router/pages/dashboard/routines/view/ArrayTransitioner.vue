<script>
let enterCount = 0;

export default {
    inheritAttrs: false,
    props: {
        delay: {
            type: Number,
            default: 100
        },
        duration: {
            type: Number,
            default: .2
        }
    },
    data: () => ({
        enterCount: 0
    }),
    computed: {
        arraySize() {
            return 0;
        },
        listeners() {
            const { "after-enter": afterEnter, "before-enter": beforeEnter, ...listeners } = this.$listeners;
            
            return listeners;
        }
    },
    methods: {
        afterEnter() {
            this.enterCount++;
            
            if (this.enterCount >= this.arraySize) {

                this.$emit('done-showing');
                this.enterCount = 0;
            }
                
        },
        beforeEnter() {
            this.enterCount++;
            
            if (this.enterCount >= this.arraySize) {
                
                this.$emit('before-showing');
                this.enterCount = 0;
            }
                
        }
    },
}
</script>
