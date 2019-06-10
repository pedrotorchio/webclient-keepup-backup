<script>
import moment from 'moment';
import Form from '@/components/generic/form/Form.mixin';
import { dateFormats, now, fromTimestamp, toTimestamp } from '@/visualization/utils/date';

export default {
  name: 'Routine-Form',
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
      this.changed('date');
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
        return toTimestamp(this.form.date);
      },
      set(value) {
        this.form.date = fromTimestamp(value);
      }
    },
    textFields() {
      return [
        [ 'title', 'Título*'],
        [ 'comment' , 'Comentário'],
      ]
    },
    now
  }
}
</script>
<template lang="pug">
v-form.ku-form(
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
<style lang="stylus" src='@/components/generic/form/styles.styl'></style>

<style lang="stylus" scoped>

.input
  width: 100%;
.input-title
  font-weight: bold;


</style>
