<template>
    <v-row align="center" justify="center">
        <v-card max-width="400" elevation="1" class="mx-auto pa-10">
          <logo-app class="mb-10"></logo-app>
          <div class="text-left mb-10">
            <h2 class="mb-5">Forgot password? </h2>
            <p>We will send a password reset link to the email address of the connected accounted.</p>
          </div>
          <v-form>
            <v-text-field
                v-model="email"
                type="email"
                placeholder="john@example.com"
                :rules="emailRules"
                :error-messages="errors"
                variant="outlined"
                density="compact"/>
            <v-btn class="rounded-0 mb-8" color="primary" x-large block @click="findEmail">
              Find</v-btn>
          </v-form>

          <v-btn elevation="0">
            <router-link to="/login" class="d-flex text-decoration-none text-primary ">
              <v-icon size="15" class="mr-3">mdi-less-than</v-icon>
              <div class="tex">Back to login</div>
            </router-link>
            </v-btn>
        </v-card>
    </v-row>
</template>

<script>
import LogoApp from "@/components/LogoApp";
import axios from "axios";
import router from "@/router";
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
            this.$router.push({name: 'EnterSecurityCode', params: { email: this.email } });
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