<template>
  <v-snackbar
      :color="color"
      :timeout="timer"
      v-model="showSnackbar"
      location="center"
  >
    <div class="text-white font-weight-medium">{{message}}</div>
  </v-snackbar>
</template>

<script>
export default {
  name: "vtoast",
  data() {
    return{
      showSnackbar: false,
      message: '',
      color: 'success',
      timer: 1000
    }
  },
  methods:{
    show(data) {
      this.message = data.message || 'missing "message".'
      this.color = data.color || 'success'
      this.timer = data.timer || 1000
      this.showSnackbar = true
    }
  }
}
</script>
