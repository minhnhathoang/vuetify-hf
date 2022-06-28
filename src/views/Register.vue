<template>
  <v-card class="mx-auto my-10" width="400">
    <v-card-title class="d-flex flex-column align-center justify-center py-7">
      <logo-app class="w-25 mb-10"></logo-app>
      <h2 class="text-2xl mb-5 text-primary">
        Register
      </h2>
    </v-card-title>

    <v-card-text>
      <p class="text-2xl font-weight-semibold text--primary mb-2">
        <!--        Welcome to healthy-first! 👋-->
      </p>
      <p class="mb-2">
        <!--        Please sign-in to your account.-->
      </p>
    </v-card-text>

    <v-card-text>
      <v-form>
        <v-text-field
            v-model="form.email"
            append-inner-icon="mdi-email"
            density="compact" label="Email"
            placeholder="john@example.com"
            type="email"
            variant="outlined"/>
        <v-text-field
            v-model="form.password"
            append-inner-icon="mdi-lock"
            density="compact" label="Password"
            type="password"
            variant="outlined"/>
        <v-text-field
            v-model="form.password_confirmation"
            append-inner-icon="mdi-lock"
            density="compact" label="Confirm password"
            type="password"
            variant="outlined"/>


        <v-btn
            block
            class="mt-6"
            color="primary"
            @click="register"
        >
          Submit
        </v-btn>
      </v-form>
    </v-card-text>

  </v-card>
</template>


<script>
import LogoApp from "@/components/LogoApp";

export default {
  components: {LogoApp},
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        password_confirmation: "",
        password: ""
      }
    }
  },
  methods: {
    register() {
      this.$store.dispatch("REGISTER", {
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation
      })
          .then(() =>
              console.log('signup success')
          )
          .catch(err => {
            console.log(err);
          })
    }
  }
}
</script>

