<script>

export default {
  props: {
    routineId: {
      type: Number | Boolean,
      default: false
    },
    routineTitle: {
      type: Number | Boolean,
      default: false
    },
  },
  data: () => ({
    routine__: null
  }),
  computed: {
    routine: {
      get() {
        
        if (!this.routineId) {
          this.routine__ = null; 
        }
        
        return this.routine__;  
      },
      set(data) {
        this.routine__ = data;
      }      
    }
  },
  methods: {
    watchRoutine(data) {
    }
  },
  watch: {
    routine: {
      immediate: true,
      deep: true,
      handler(data) {
        if (data)
          this.watchRoutine(data);
      }
    },
    routineId: {
      immediate: true,
      async handler(id) {
        if (id) {
          this.setGlobalLoading(true)
          const routine = await this.$store.dispatch('fetchRoutine', id)    
          this.routine = routine
          
          this.setGlobalLoading(false)
              
        }
      }
    }
  },
}
</script>
