<template>
    <v-row align="center" justify="center">
        <v-card max-width="400" elevation="1" class="mx-auto text-center pa-10">
          <logo-app class="mb-10"></logo-app>
          <div class="text-left mb-10">
            <h2 class="mb-5">Forgot password? </h2>
            <p>We will send a password reset link to the email address of the connected accounted.</p>
          </div>
          <v-form>
            <v-text-field
                v-model="email"
                type="email"
                append-inner-icon="mdi-email"
                placeholder="john@example.com"
                variant="outlined"
                density="compact"/>
            <router-link to="/enter-security-code" class="d-flex text-decoration-none text-primary ">
            <v-btn class="rounded-0 mb-8" color="primary" x-large block dark>
              Send reset link</v-btn>
            </router-link>
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
export default {
  name: "ForgotPassword",
  components: {LogoApp}
}
</script>

<style scoped>

</style>