<template>
  <v-row align="center" justify="center">
    <v-card max-width="400" elevation="1" class="mx-auto text-center pa-10">
      <logo-app class="mb-10"></logo-app>
      <div class="text-left mb-10">
        <h2 class="mb-5">Create your password</h2>
        <p>Please check your emails for a message with your code. Your code is 8 numbers long.</p>
      </div>
      <v-form>
        <v-text-field
            v-model="password"
            type="password"
            label="Password" append-inner-icon="mdi-lock"
            variant="outlined"
            color="primary"
            density="compact"/>
        <v-text-field
            v-model="password_confirmation"
            type="password"
            label="Confirm password" append-inner-icon="mdi-lock"
            variant="outlined"
            color="primary"
            density="compact"/>

        <div class="text-error">{{this.errors}}</div>
      </v-form>
      <v-btn
          block
          color="primary"
          class="mt-6"
          @click="resetPassword"
      >
        Submit
      </v-btn>
    </v-card>
  </v-row>
</template>

<script>
import LogoApp from "@/components/LogoApp";
import axios from "axios";
export default {
  components: {LogoApp},
  data: () => ({
    password: null,
    password_confirmation: null,
    errors: null,
  }),
  props: {
    email: null,
    token: null
  },
  methods: {
    resetPassword() {
      axios.post('/reset-password', {
        email: this.email,
        token: this.token,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
          .then(response => {
            this.$router.push('/login');
          })
          .catch(error => {
            this.errors = error.response.data.message;
          })
    }
  }
}
</script>

<style scoped>

</style>