<template>

  <div class="text-center my-auto">
    <h1 class="text-primary">Whoops, 404 </h1>
    <h3 class="font-weight-regular mt-5">The page you were looking for does not exist.</h3>
    <v-btn class="mt-10" color="primary" to="/" variant="outlined">Go back !</v-btn>
    <c-footer></c-footer>
    <v-btn class="mt-10 mx-3"
           color="primary"
           flat
    >
      Help
    </v-btn>
  </div>
</template>

<script>

import CFooter from "@/components/layouts/CFooter";

export default {
  components: {CFooter}
}
</script>
