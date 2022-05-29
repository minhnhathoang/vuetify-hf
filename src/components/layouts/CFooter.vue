<template>
  <v-footer
      inset
      color=""
      height="35"
      class="px-0 d-flex border-t justify-space-between"
      app
  >
     <div class="boxed-container w-full">
       <div class="mx-6 d-flex justify-space-between">
          <span>
            &copy; 2022 <a
              href="https://themeselection.com"
              class="text-decoration-none"
              target="_blank"
          >Healthy First</a></span>
       </div>
     </div>

    <div class=" hidden-sm-and-down">
        <v-btn
            v-for="link in links"
            :key="link"
            variant="text"
            size="small"
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