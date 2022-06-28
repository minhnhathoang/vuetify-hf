<template>
  <v-snackbar
      v-model="showSnackbar"
      :color="color"
      :timeout="timer"
      location="center"
  >
    <v-progress-circular v-if="load === true"
                         indeterminate
    ></v-progress-circular>
    <div class="text-white font-weight-medium">{{ message }}</div>
  </v-snackbar>
</template>

<script>
export default {
  name: "vtoast",
  data() {
    return {
      showSnackbar: false,
      message: '',
      color: 'success',
      timer: 1000,
      load: false
    }
  },
  methods: {
    show(data) {
      this.message = data.message || 'missing "message".'
      this.color = data.color || 'success'
      this.timer = data.timer || 1000
      this.showSnackbar = true
      this.load = data.load || false
    }
  }
}
</script>
