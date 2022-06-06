<template>
  <div>
    <v-btn
        @click="toggleTheme"
    >
    </v-btn>

  </div>
</template>

<script>
import { useTheme } from 'vuetify'
export default {
  setup () {
    const theme = useTheme()
    return {
      theme,
      toggleTheme: () => {
        theme.themes.dark = !theme.themes.dark;
        console.log(theme.current);
      }
    }
  }
}
</script>
