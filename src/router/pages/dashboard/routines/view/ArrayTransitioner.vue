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
    computed: {
        arraySize() {
            return 0;
        }
    },
    methods: {
        entered() {
            enterCount++;
            
            if (enterCount >= this.arraySize) {
                
                this.$emit('done-showing');
            }
                
        }
    }
}
</script>
