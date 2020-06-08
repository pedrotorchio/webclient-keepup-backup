<script>
import Form from '@/components/generic/form/Form.mixin';
import Share from './Share.mixin';

import '@/icons/wa';
import '@/icons/email';

export default {
  name: 'New-Form',
  extends: Form,  
  mixins: [ Share ],
  constants: {
    REQUIRED_FIELDS: [
      'filler_name'
    ],
    TEXT_FIELDS: [
      [ 'comment' , 'Comentário']      
    ]
  },
  props: {
    items: {
      type: Array,
      default: ()=>([])
    }
  },
  data: () => ({
    isValid: false,
    form: {
      filler_name: '',
      comment: '',
    },
    updated_at: '',
  }),
  methods: {
    caregiverText: giver => `${giver.first_name} ${giver.last_name}`,
    changed(key) { 
      
      const { filler_name } = this.form;

      if (filler_name) {

        const data = { ...this.form };
        this.$emit('change', data);
      }
    },
  },

}
</script>
<template lang="pug">
v-form.ku-form(
    v-model='isValid'
  )        
  v-select(
    :items="items"
    v-model="form.filler_name"
    flat
    :item-value = "caregiverText"
    :item-text = "caregiverText"
    :required="isRequiredField('filler_name')"
    :disabled="isCreation() && !isRequiredField('filler_name')"
    label="Cuidador"
    @change="changed('filler_name')"
    no-data-text = "Nenhum cuidador cadastrado. Cadastre algum."
  )
    //- template(
    //-     slot="item"
    //-     slot-scope="{ item }" ) {{ item.first_name }} {{ item.last_name }}
    
  v-text-field( 
    v-for="([key, label, isRequired], i) in TEXT_FIELDS"
    v-model='form[key]'
    :class="`input-${key}`"
    class="input"
    :label='label'
    @input="changed(key)"
    :required="isRequiredField(key)"
    :disabled="isCreation() && !isRequiredField(key)"
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
          @click = "shareOnWhatsapp"
        )
  
</template>
<style lang="stylus" src='@/components/generic/form/styles.styl'></style>

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
        cursor pointer


</style>
