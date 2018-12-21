<script>
let enterCount = 0;

export default {
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
        }
    },
    methods: {
        entered() {
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
