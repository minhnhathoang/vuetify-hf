<template>
  <v-row align="center" justify="center">
    <v-card class="mx-auto my-10 w-100" max-width="400">
      <v-card-title class="d-flex flex-column pt-10">
        <logo-app class="w-25 mb-10"></logo-app>
        <h2 class="text-2xl text-primary">
          <!--            healthy first-->
          Login
        </h2>
      </v-card-title>

      <v-card-text>
        <p class="text-2xl font-weight-semibold text--primary mb-2">
          <!--          Welcome to healthy-first! 👋-->
        </p>
        <p class="mb-2">
          Please sign-in to your account.
        </p>
      </v-card-text>
      <v-form>
        <v-card-text>
          <v-text-field
              v-model="email"
              :rules="emailRules"
              append-inner-icon="mdi-email" density="compact"
              label="Email"
              placeholder="john@example.com"
              type="email"
              variant="outlined"/>
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              append-inner-icon="mdi-lock" density="compact"
              label="Password"
              type="password"
              variant="outlined"
          />
          <v-alert v-if="errors != null" color="error" variant="text-">{{ errors }}</v-alert>
        </v-card-text>
        <v-btn class="float-right me-5 mb-2" flat size="small" to="/forgot-password">
          Forgot password?
        </v-btn>
        <v-card-text>
          <v-btn
              block
              color="primary"
              @click="login"
          >
            Login
          </v-btn>
        </v-card-text>
      </v-form>
    </v-card>
  </v-row>
</template>


<script>
import LogoApp from "@/components/LogoApp";


export default {
  components: {LogoApp},
  name: "LoginView",
  data: () => ({
    email: null,
    password: null,
    errors: null,

    emailRules: [
      v => !!v || 'The email field is required.',
      v => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(v) || 'The email must be a valid email address.'
      },
    ],
    passwordRules: [
      v => !!v || 'The password field is required.',
      v => (v || '').length >= 8 || 'The password field must be at least 8 characters.',
    ]
  }),
  methods: {
    login() {
      this.$store.dispatch("account/login", {
        email: this.email,
        password: this.password,
      }).catch(error => {
        this.errors = error;
      });
    }
  }
}
</script>

<style>

/* https://github.com/vuetifyjs/vuetify/issues/5269 */

@-webkit-keyframes autofill {
  0%, 100% {
    color: inherit;
    background: transparent;
  }
}

input:-webkit-autofill {
  -webkit-animation-delay: 1s; /* Safari support - any positive time runs instantly */
  -webkit-animation-name: autofill;
  -webkit-animation-fill-mode: both;
}
</style>