<template>
  <div>
    <v-btn
        @click.stop="language = !language"
        icon
    >
      {{language ? "vi" : "en"}}
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
