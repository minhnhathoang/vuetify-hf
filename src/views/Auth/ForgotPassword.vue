<template>
  <v-row align="center" justify="center">
    <v-card class="mx-auto pa-10" elevation="1" max-width="400">
      <logo-app class="mb-10"></logo-app>
      <div class="text-left mb-10">
        <h2 class="mb-5">Forgot password? </h2>
        <p>We will send a password reset link to the email address of the connected accounted.</p>
      </div>
      <v-form>
        <v-text-field
            v-model="email"
            :error-messages="errors"
            :rules="emailRules"
            density="compact"
            placeholder="john@example.com"
            type="email"
            variant="outlined"/>
        <v-btn block class="rounded-0 mb-8" color="primary" x-large @click="findEmail">
          Find
        </v-btn>
      </v-form>

      <v-btn elevation="0">
        <router-link class="d-flex text-decoration-none text-primary " to="/login">
          <v-icon class="mr-3" size="15">mdi-less-than</v-icon>
          <div class="tex">Back to login</div>
        </router-link>
      </v-btn>
    </v-card>
  </v-row>
</template>

<script>
import LogoApp from "@/components/LogoApp";
import axios from "axios";

export default {
  name: "ForgotPassword",
  components: {LogoApp},
  data: () => ({
    email: null,
    errors: "",

    emailRules: [
      v => !!v || 'The email field is required.'
    ]
  }),
  methods: {
    findEmail() {
      let email = this.email;
      axios.post('/forgot-password', {email: this.email})
          .then(response => {
            this.$router.push({name: 'EnterSecurityCode', params: {email: this.email}});
          })
          .catch(error => {
            this.errors = error;
            this.errors = error.response.data.message;
            if (error.response.data.message.email[0] != null) {
              this.errors = error.response.data.message.email[0];
            }
          })
    }
  }
}
</script>

<style scoped>

</style>