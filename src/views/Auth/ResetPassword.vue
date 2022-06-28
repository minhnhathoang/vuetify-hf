<template>
  <v-row align="center" justify="center">
    <v-card class="mx-auto text-center pa-10" elevation="1" max-width="400">
      <logo-app class="mb-10"></logo-app>
      <div class="text-left mb-10">
        <h2 class="mb-5">Create your password</h2>
        <p>Please check your emails for a message with your code. Your code is 8 numbers long.</p>
      </div>
      <v-form>
        <v-text-field
            v-model="password"
            append-inner-icon="mdi-lock"
            color="primary" density="compact"
            label="Password"
            type="password"
            variant="outlined"/>
        <v-text-field
            v-model="password_confirmation"
            append-inner-icon="mdi-lock"
            color="primary" density="compact"
            label="Confirm password"
            type="password"
            variant="outlined"/>

        <div class="text-error">{{ this.errors }}</div>
      </v-form>
      <v-btn
          block
          class="mt-6"
          color="primary"
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