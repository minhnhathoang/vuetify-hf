<template>
  <v-row align="center" justify="center">
    <v-card max-width="400" class="mx-auto my-10 w-100">
      <v-card-title class="d-flex flex-column py-7">
        <logo-app class="w-25 mb-10"></logo-app>
          <h2 class="text-2xl mb-5 text-primary">
<!--            healthy first-->
            Login
          </h2>
      </v-card-title>

      <v-card-text>
        <p class="text-2xl font-weight-semibold text--primary mb-2">
          Welcome to healthy-first! 👋
        </p>
        <p class="mb-2">
          Please sign-in to your account.
        </p>
      </v-card-text>

      <v-card-text>
        <v-form>
          <v-text-field
              v-model="email"
              type="email"
              label="Email" append-inner-icon="mdi-email"
                        placeholder="john@example.com"
                        variant="outlined"
              style=""
                        density="compact"/>
          <v-text-field
              v-model="password"
              type="password"
              label="Password" append-inner-icon="mdi-lock"
                        variant="outlined"
                        density="compact"
          />
<!--          <v-alert v-if="errors" type="error">-->
<!--            {{ errors}}-->
<!--          </v-alert>-->



          <div class="d-flex align-center justify-space-between flex-wrap">
            <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
                color="primary"
            >
            </v-checkbox>

            <router-link
                to="/forgot-password"
                class="mt-1 text-decoration-none"
            >
              Forgot Password?
            </router-link>
          </div>

          <v-btn
              block
              color="primary"
              class="mt-6"
              @click="login"
          >
            Login
          </v-btn>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
    </v-row>
</template>


<script>
import LogoApp from "@/components/LogoApp";

export default {
  components: {LogoApp},
  name: "LoginView",
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    }
  }
}
</script>

<style>

/* https://github.com/vuetifyjs/vuetify/issues/5269 */

@-webkit-keyframes autofill {
  0%,100% {
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