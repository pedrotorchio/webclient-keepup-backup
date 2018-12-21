<script>
export default {
    props: {
        form: {
            type: Object,
            required: true
        },
        color: {
            type: String,
            default: 'blue'
        }
    },
    computed: {
        isVisible() {
            return this.form.visibility;
        }
    }
}
</script>


<template lang="pug">

    div.toggle(
        :class = "{ on: isVisible }"
        :style = "{ borderColor: color, backgroundColor: isVisible ? color : 'transparent' }"
    )
        span(
        :style = "{ color: isVisible ? 'white' : color }"
        ) {{ form.filler_name }}

        ul.tooltip
            li.edit-btn 
                router-link(
                @click.native.stop = "(() => ({}))"
                :to = "{ name: 'FormEdit', params: { formId: form.id } }"
                ) Editar/Compartilhar

            li.filler_name {{ form.filler_name }}

            li.pts(
                v-if = "form.punctuation"
            ) {{ form.punctuation }}

            li.quote(
                v-if = "form.comment"
            ) {{ form.comment }}

            li.tip Clique para {{ isVisible ? 'esconder' : 'mostrar' }} atividades

</template>

<style lang="stylus" scoped>
    .toggle
      margin 2px
      padding 2px
      border 2px solid
      border-radius 5px
      display inline-block
      position relative
      font-size 12px
      cursor pointer
      line-height 1.5em

    .filler_name, .pts, .edit-btn
        display inline-block
        margin 0 5px
      
    .edit-btn
        position: absolute;
        right: 0;
        top: 0;
        font-size: .6em;
        margin: .5em;
        
    .filler_name
        text-transform uppercase

    .quote, .tip
        font-size .8em

    .tip
        font-weight bold
        margin-top 1em
        text-align center

    .tooltip
        display none
        position absolute
        width 300px
        z-index 555
        background rgba(0,0,0,.8)
        color white
        padding 24px
        top 80%
        left 50%
        font-size 1.5em

    li
        line-height: 1.5em

    .toggle:hover
      .tooltip
        display block;

</style>
