<template>
  <v-row align="center" justify="center">
    <v-card class="mx-auto text-center pa-10" elevation="1" max-width="400">
      <logo-app class="mb-10"></logo-app>
      <div class="text-left mb-10">
        <h2 class="mb-5">Enter security code </h2>
        <p>Please check your emails for a message with your code. Your code is 8 numbers long.</p>
      </div>
      <v-form>
        <v-text-field
            v-model="code"
            color="primary"
            density="compact"
            placeholder="Enter code"
            type=""
            variant="outlined"/>
        <v-btn block class="rounded-0 mb-8" color="primary" x-large @click="verifyPin">
          Find
        </v-btn>
      </v-form>

      <v-card-actions>
        <router-link class="d-flex text-decoration-none text-primary " to="/forgot-password">
          <div class="text-sm-body-2">Get a new code</div>
        </router-link>
      </v-card-actions>

    </v-card>
  </v-row>

</template>

<script>
import LogoApp from "@/components/LogoApp";
import axios from "axios";

export default {
  name: "EnterSecurityCode",
  components: {LogoApp},
  data: () => ({
    code: null
  }),
  props: {
    email: null
  },
  methods: {
    verifyPin() {
      axios.post('/verify/pin', {email: this.email, token: this.code})
          .then(response => {
            console.log(this.email + "AAAAAAAAAAA" + this.code);
            this.$router.push({name: 'ResetPassword', params: {email: this.email, token: this.code}});
          })
          .catch(error => {
          })
    }
  }

}
</script>

<style scoped>

</style>