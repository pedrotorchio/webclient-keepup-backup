<template lang="pug">
  div#signup-page.page

    h1#title KeepUp

    div.floating.padded-large(
      ref = "loadingContainer"
      v-loading = "isLoading"
    )
      p.tip
        |Preencha com sua nova senha duas vezes.
        br
        |A senha deve possuir mais de 5 caracteres.
      input( v-model="password" type="password" placeholder="Senha" autocomplete="new-password" )
      input( v-model="confirmation" type="password" placeholder="Confirmação" autocomplete="new-password" )
      button.no-border.call-to-action( :disabled="!isPasswordValid" @click="resetPassword" ) Alterar senha
</template>
<script lang="ts">
import jwt from 'jsonwebtoken';
import { Component, Vue } from 'vue-property-decorator'

type InfoObject = {
  username: string | null;
  email: string | null;
  hashExpiration: Date | null;
}

@Component
export default class PasswordChange extends Vue {
  declare setGlobalLoading: (s: boolean) => void;
  hash: string | null = null;
  info: InfoObject = {
    username: null,
    email: null,
    hashExpiration: null
  };
  password: string | null = null;
  confirmation: string | null = null;

  get isPasswordValid() {
    const password = this.password || "";
    const confirmation = this.confirmation || "";
    const confirmed = password === confirmation
    const length = password && password.length > 5;
    return confirmed && length;
  }
  async resetPassword() {
    this.setGlobalLoading(true);
    await this.$store.dispatch("reset-password", {
      password: this.password,
      hash: this.hash
    });
    this.setGlobalLoading(false);
    this.$router.push({ name: 'Login' })
  }
  created(){
    this.hash = this.$route.query["h"] as string;
    const { name, email, exp: expirationInSeconds } = jwt.decode(this.hash) as { name: string, email: string, exp: string | number };
    const numericExpirationInSeconds:number =  typeof expirationInSeconds === 'string' ? parseInt(expirationInSeconds) : expirationInSeconds;
    const expirationInMiliseconds = numericExpirationInSeconds ? numericExpirationInSeconds * 1000 : null;
    this.info = {
      username: name || null,
      email: email || null,
      hashExpiration: expirationInMiliseconds ? new Date(expirationInMiliseconds) : null
    };
  }
}

</script>
<style lang="stylus" src="../login/styles.styl"></style>
<style lang="sass">
  input, button
    display: block
  button
    text-align: center
</style>
