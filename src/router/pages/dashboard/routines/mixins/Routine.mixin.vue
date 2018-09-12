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
        this.watchRoutine(data);
      }
    },
    routineId: {
      immediate: true,
      handler(id) {
        if (id) {
          
          this.$store.dispatch('fetchRoutine', id)
              .then( routine => this.routine = routine );
        }
      }
    }
  },
}
</script>
