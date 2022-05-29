<template>
  <v-card class="border-sm rounded-lg align-self-center" elevation="0" max-width="600">
    <v-toolbar>
      <v-toolbar-title>Add user</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <div class="align-content-space-between d-sm-flex">
        <v-text-field
            v-model="first_name"
            type="text"
            label="First Name"
            variant="outlined"
            color="primary"
            density="compact"/>
        <v-text-field
            v-model="surname"
            type="text"
            label="Surname"
            variant="outlined"
            class="mx-sm-3"
            color="primary"
            density="compact"/>
        <v-text-field
            v-model="last_name"
            type="text"
            label="Last Name"
            variant="outlined"
            color="primary"
            density="compact"/>
      </div>
      <v-text-field
          v-model="email"
          type="email"
          label="Email" append-inner-icon="mdi-email"
          placeholder="john@example.com"
          variant="outlined"
          color="primary"
          density="compact"/>

      <v-text-field
          v-model="email"
          type="email"
          label="Contact" append-inner-icon="mdi-phone"
          placeholder="john@example.com"
          variant="outlined"
          color="primary"
          density="compact"/>

      <v-select
          :items="roles"
          label="Role"
          variant="outlined"
          density="compact"
          color="primary"
      ></v-select>

        <v-radio-group v-model="radios" inline>
          <template v-slot:label>
            <div class="mb-4"><strong>Choose a user role</strong></div>
          </template>
          <v-radio value="0" color="primary">
            <template v-slot:label>
              Manager
            </template>
          </v-radio>
          <v-radio value="1" color="primary">
            <template v-slot:label>
              Specialist
            </template>
          </v-radio>
        </v-radio-group>

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
          <v-btn
              :disabled="dialog"
              :loading="dialog"
              class="bg-primary text-white"
              @click="dialog = true"
              block=""
          >
            Add new user
          </v-btn>
          <v-dialog
              v-model="dialog"
              hide-overlay
              persistent
          >
            <v-card
                color="primary"
            >
              <v-card-text>
                Please wait
                <v-progress-linear
                    indeterminate
                    color="white"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddUser",
  data () {
    return {
      info: [
        ["Name", "Hoang Minh Nhat"],
        ["Emai", "minhatlop5b@gmail.com"],
        ["Age", "20"],
        ["Location", "Hai Duong"],
        ["Gender", "Male"]

      ],
      roles: ['Manager', 'Specialist'],
      dialog: false,
    }
  },
  watch: {
    dialog (val) {
      if (!val) return

      setTimeout(() => (this.dialog = false), 1000)
    },
  },
}
</script>

<style scoped>
</style>