<script>
import moment from 'moment';

const formData = () => ({
      title: '',
      comment: '',
      date: now()
});
function now() {
  return moment().format('YYYY-MM-DD');
}
const dateFormats = {
  timestamp: 'YYYY-MM-DD',
  regular: 'DD/MM/YYYY'
};
export default {
  name: 'Form',
  props: {
    patient: {
      type: Object | Boolean,
      default: false
    }
  },
  data: () => ({
    isValid: false,
    form: formData(),
    updated_at: '',
    dateModal: false
  }),
  methods: {
    dateChanged() {
      this.dateModal = false;
    },
    changed(key) {
      
      const { date } = this.form;

      if (date) {

        const data = { ...this.form };
        this.$emit('change', data);
      }
    },
  },
  computed: {
    dateModel: {
      get() {
        return moment(this.form.date, dateFormats.timestamp).format(dateFormats.regular);
      },
      set(value) {
        this.form.date = moment(value, dateFormats.regular).format(dateFormats.timestamp);
      }
    },
    textFields() {
      return [
        [ 'title', 'Título'],
        [ 'comment' , 'Comentário'],
      ]
    },
    dateFields() {
      return [
        [ 'date' , 'Data'],
      ]
    },
    now
  },
  watch: {
    patient: {
      immediate: true,
      deep: true,
      handler(data) {
        if (data) {
          this.form = {...this.patient};
        } else {
          this.form = formData();
        }
      }
    }
  }
}
</script>
<template lang="pug">
v-form(
    v-model='isValid'
  )
  v-dialog(
    class='date-container input'
    ref="dialog"
    v-model="dateModal"
    lazy
    full-width
    width="290px" )
      
    v-text-field(
      slot="activator"
      v-model="dateModel"
      label="Data"
      prepend-icon="event" )
      
    v-date-picker( 
      class='date'
      v-model="form.date" 
      :show-current="now"
      @input="dateChanged"
      scrollable )
        
  v-text-field( 
    v-for="([key, label], i) in textFields"
    v-model='form[key]'
    :class="key"
    class="input"
    :label='label'
    @input="changed(key)"
    required
  )
</template>
<style lang="stylus" src='@/components/generic/form/styles.styl' scoped></style>

<style lang="stylus" scoped>

.input
  width: 100%;

</style>
