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
            v-model="password"
            type="password"
            label="Confirm password" append-inner-icon="mdi-lock"
            variant="outlined"
            color="primary"
            density="compact"/>
      </v-form>
      <v-btn
          block
          color="primary"
          class="mt-6"
      >
        Submit
      </v-btn>
    </v-card>
  </v-row>
</template>

<script>
import LogoApp from "@/components/LogoApp";
export default {
  components: {LogoApp}
}
</script>

<style scoped>

</style>