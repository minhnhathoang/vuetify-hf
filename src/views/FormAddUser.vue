<template>
  <v-container>
    <v-card class="border-sm rounded-lg align-self-center" elevation="15">
      <v-toolbar>
        <v-toolbar-title>Add user</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <div class="align-content-space-between d-sm-flex">
          <v-text-field
              v-model="form.first_name"
              color="primary"
              density="compact"
              label="First Name"
              type="text"
              variant="outlined"/>
          <v-text-field
              v-model="form.surname"
              class="mx-sm-3"
              color="primary"
              density="compact"
              label="Surname"
              type="text"
              variant="outlined"/>
          <v-text-field
              v-model="form.last_name"
              color="primary"
              density="compact"
              label="Last Name"
              type="text"
              variant="outlined"/>
        </div>
        <v-text-field
            v-model="form.email"
            append-inner-icon="mdi-email"
            color="primary" density="compact"
            label="Email"
            placeholder="john@example.com"
            type="email"
            variant="outlined"/>

        <v-text-field
            v-model="form.mobile"
            append-inner-icon="mdi-phone"
            color="primary" density="compact"
            label="Mobile"
            type="number"
            variant="outlined"/>

        <!--        <v-select-->
        <!--            :items="form.role_id"-->
        <!--            label="Role"-->
        <!--            variant="outlined"-->
        <!--            density="compact"-->
        <!--            color="primary"-->
        <!--        ></v-select>-->

        <v-snackbar
            v-model="snackbar"
            color="error"
            location="center"
            timeout="5000"
        >
          <div v-for="(i, k) in errors">
            {{ i[0] }}
          </div>
          <template v-slot:actions>
            <v-btn
                @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>

        <v-radio-group v-model="form.role_id" inline>
          <template v-slot:label>
            <div class="mb-4"><strong>Choose a user role</strong></div>
          </template>
          <v-radio color="primary" value="1">
            <template v-slot:label>
              Admin
            </template>
          </v-radio>
          <v-radio color="primary" value="2">
            <template v-slot:label>
              User
            </template>
          </v-radio>
        </v-radio-group>

      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <v-btn
            :disabled="dialog"
            :loading="dialog"
            class="bg-primary text-white"
            @click="addUser"
        >
          Add new user
        </v-btn>
        <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
        >
          <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
          ></v-progress-circular>
        </v-dialog>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      form: {
        first_name: null,
        surname: null,
        last_name: null,
        email: null,
        mobile: null,
        role_id: null,
      },
      roles: ['Manager', 'Specialist'],
      dialog: false,
      snackbar: false,
      timeout: 2000,
      errors: null,
    }
  },
  watch: {
    dialog(val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 1000)
    },
  },
  methods: {
    addUser() {
      this.$store.dispatch('account/addUser', {
        first_name: this.form.first_name,
        surname: this.form.surname,
        last_name: this.form.last_name,
        email: this.form.email,
        mobile: this.form.mobile,
        role_id: this.form.role_id,
      }).catch(error => {
        this.snackbar = true;
        this.errors = error;
      });
      this.dialog = true;
    }
  }
}
</script>

<style scoped>
</style>