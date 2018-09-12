<script>
import moment from 'moment';
import Form from '@/components/generic/form/Form.mixin';

const dateFormats = {
  timestamp: 'YYYY-MM-DD',
  regular: 'DD/MM/YYYY'
};
function now() {
  return moment().format(dateFormats.regular);
}

export default {
  name: 'Form',
  extends: Form,
  data: () => ({
    isValid: false,
    form: {
      title: '',
      comment: '',
      date: now()
    },
    updated_at: '',
    dateModal: false
  }),
  methods: {
    dateChanged() {
      this.dateModal = false;
    },
    changed(key) {
      
      const { date, title } = this.form;

      if (date && title) {

        const data = { ...this.form };
        this.$emit('change', data);
      }
    },
  },
  computed: {
    dateTimestamp: {
      get() {
        return moment(this.form.date, dateFormats.regular).format(dateFormats.timestamp);
      },
      set(value) {
        this.form.date = moment(value, dateFormats.timestamp).format(dateFormats.regular);
      }
    },
    textFields() {
      return [
        [ 'title', 'Título*'],
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
      v-model="form.date"
      label="Data"
      prepend-icon="event" )
      
    v-date-picker( 
      class='input-date'
      v-model="dateTimestamp" 
      :show-current="now"
      @input="dateChanged"
      scrollable )
        
  v-text-field( 
    v-for="([key, label], i) in textFields"
    v-model='form[key]'
    :class="`input-${key}`"
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
.input-title
  font-weight: bold;


</style>
