<template>
  <div>
    <v-btn
        icon
        @click.stop="language = !language"
    >
      {{ language ? "vi" : "en" }}
    </v-btn>

  </div>
</template>

<script>
export default {
  data: () => ({
    language: false,
  }),
}
</script>
