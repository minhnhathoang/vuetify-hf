<template>
  <v-footer
      app
      class="px-0 d-flex border-t justify-space-between"
      color=""
      height="35"
      inset
  >
    <div class="boxed-container w-full">
      <div class="mx-6 d-flex justify-space-between">
          <span>
            &copy; 2022 <a
              class="text-decoration-none"
              href="https://themeselection.com"
              target="_blank"
          >Healthy First</a></span>
      </div>
    </div>

    <div class=" hidden-sm-and-down">
      <v-btn
          v-for="link in links"
          :key="link"
          size="small"
          variant="text"
      >
        {{ link }}
      </v-btn>
    </div>

  </v-footer>
</template>

<script>
export default {
  name: "CFooter",
  data: () => ({
    links: [
      'About',
      'Team',
      'Help',
      'Contact Us',
    ],
  }),
}
</script>

<style scoped>

</style>