<script>
import Form from '@/components/generic/form/Form.mixin';
import '@/icons/wa';
import '@/icons/email';

export default {
  name: 'New-Form',
  extends: Form,  
  data: () => ({
    isValid: false,
    form: {
      filler_name: '',
      comment: '',
    },
    updated_at: '',
  }),
  methods: {
    changed(key) { 
      
      const { filler_name } = this.form;

      if (filler_name) {

        const data = { ...this.form };
        this.$emit('change', data);
      }
    },
  },
  computed: {
    urlRoute() {
      if (!this.model)
        return;

      const formId = this.model.id;
      return {
        name: 'TasksForm',
        params: {
          formId
        }
      }
    },
    url() {
      if (!this.model)
        return;

      return window.location.origin + this.$router.resolve(this.urlRoute).href
    },
    textFields() {
      return [
        [ 'filler_name' , 'Preenchedor*', true],
        [ 'comment' , 'Comentário'],
      ]
    },
  }
}
</script>
<template lang="pug">
v-form(
    v-model='isValid'
  )        
  v-text-field( 
    v-for="([key, label, isRequired], i) in textFields"
    v-model='form[key]'
    :class="`input-${key}`"
    class="input"
    :label='label'
    @input="changed(key)"
    :required = 'isRequired'
  )
  div#sharing-section( v-if = "url" )
    router-link(
      :to = "urlRoute"
    ) {{ url }}

    div#share-container
      h3 Compartilhar
      div.medias
        svgicon.media.whatsapp(
          icon = "wa"
          :original = 'true'
        )
        svgicon.media.whatsapp(
          icon = "email"
          :original = 'true'
        )
  
</template>
<style lang="stylus" src='@/components/generic/form/styles.styl' scoped></style>

<style lang="stylus" scoped>

.input
  width: 100%;
.input-title
  font-weight: bold;

#sharing-section
  width 100%

  .router-link
    display inline-block
    width 100%
    text-align center
    font-style italic

  #share-container
    display flex
    align-items center
    h3
      flex 0 0 auto
      text-align left
      margin-right 1em
    
    .medias
      flex 1 0 auto
      display flex
      justify-content flex-start
      align-items center

      .media
        flex 0 0 auto
        height 60px
        width auto
        margin 5px 10px
        padding 10px


</style>
