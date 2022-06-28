<template>
  <v-card>
    <v-tabs
        v-model="tab"
        color="primary"

    >
      <v-tab :value="1" class="text-center">
        <div class="align-self d-flex">
          <v-icon class="mr-3" size="x-large">mdi-account-outline</v-icon>
          <div class="align-self-end">Account</div>
        </div>
      </v-tab>
      <v-tab :value="2">
        <div class="align-self d-flex">
          <v-icon class="mr-3" size="large">mdi-lock-outline</v-icon>
          <div class="align-self-end">Security</div>
        </div>
      </v-tab>
      <v-tab :value="3">Info</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
          :value="1"
          ev
      >
        <v-card class="ma-sm-5" elevation="0">
          <v-card-content class="d-flex align-center">
            <v-avatar rounded="0" size="140">
              <v-img :src="form.avatar" cover height="100%"></v-img>
            </v-avatar>
            <div class="px-3 align-self-end">
              <div class="">
                <h3 class="">{{ form.full_name }}</h3>
                <v-chip
                    class="my-2 font-weight-bold"
                    color="primary"
                    size="small"
                >
                  {{ form.role }}
                </v-chip>
              </div>

              <v-btn :loading="isSelecting" color="primary" size="small" variant="outlined"
                     @click="handleFileImport">
                Upload new photo
              </v-btn>

              <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  @change="onFileChanged"
              >
              <div class="text-caption text-high-emphasis pa-2">Allowed JPG, GIF or PNG</div>
            </div>

          </v-card-content>

          <v-card-text class="v-col-12">
            <v-row>
              <div class="v-col-md-4 v-col-12">
                <v-text-field
                    v-model="form.first_name"
                    color="primary"
                    density="compact"
                    hide-details="auto"
                    hint="This field is required"
                    label="First Name"
                    type="text"
                    variant="outlined"/>
              </div>
              <div class="v-col-md-4 v-col-12">
                <v-text-field
                    v-model="form.surname"
                    color="primary"
                    density="compact"
                    hide-details="auto"
                    label="Surname"
                    type="text"
                    variant="outlined"/>
              </div>
              <div class="v-col-md-4 v-col-12">
                <v-text-field
                    v-model="form.last_name"
                    color="primary"
                    density="compact"
                    hide-details="auto"
                    hint="This field is required"
                    label="Last Name"
                    type="text"
                    variant="outlined"/>
              </div>
              <div class="v-col-md-6 v-col-12">
                <v-text-field
                    v-model="form.email"
                    append-inner-icon="mdi-email"
                    color="primary" density="compact"
                    hide-details="auto"
                    hint="This field is required"
                    label="Email"
                    placeholder="john@example.com"
                    type="email"
                    variant="outlined"/>
              </div>
              <div class="v-col-md-6 v-col-12">
                <v-text-field
                    v-model="form.mobile"
                    append-inner-icon="mdi-email"
                    color="primary" density="compact"
                    hide-details="auto"
                    label="Mobile"
                    type="number"
                    variant="outlined"/>
              </div>
              <div class="v-col-md-6 v-col-12">
                <v-text-field
                    v-model="form.birthday"
                    color="primary"
                    density="compact"
                    hide-details
                    label="Birthday"
                    outlined
                    type="date"
                    variant="outlined"
                />
              </div>
              <div class="v-col-md-6 v-col-12">
                <v-radio-group v-model="form.gender" class="d-flex" inline>
                  <v-radio color="primary" value="Male">
                    <template v-slot:label class="">
                      Male
                    </template>
                  </v-radio>
                  <v-radio color="primary" value="Female">
                    <template v-slot:label>
                      Female
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
              <div class="v-col-md-6 v-col-12">
                <v-text-field
                    v-model="form.location"
                    color="primary"
                    density="compact"
                    disabled
                    hide-details
                    label="Location"
                    outlined
                    type="text"
                    variant="outlined"
                />
              </div>
            </v-row>
          </v-card-text>
          <v-card-text class="d-flex">
            <v-btn color="primary" @click="updateProfile">Save changes</v-btn>

            <v-btn class="mx-2" color="primary" variant="outlined" @click="resetForm">Reset</v-btn>
          </v-card-text>
        </v-card>
      </v-window-item>

      <!--      ///////////////////////////-->
      <v-window-item
          :value="2"
      >
        <v-card class="ma-sm-5" elevation="0">
          <v-card-text class="v-col-md-5 v-col-sm-7">
            <v-text-field
                v-model="pw.current_password"
                append-inner-icon="mdi-lock"
                color="primary" density="compact"
                hint="This field is required"
                label="Current Password"
                type="password"
                variant="outlined"/>
            <v-text-field
                v-model="pw.new_password"
                append-inner-icon="mdi-lock"
                color="primary" density="compact"
                label="New Password"
                type="password"
                variant="outlined"/>
            <v-text-field
                v-model="pw.new_password_confirmation"
                append-inner-icon="mdi-lock"
                color="primary" density="compact"
                label="Confirm New Password"
                type="password"
                variant="outlined"/>

            <v-snackbar
                v-model="snackbar"
                color="error"
                location="center"
                timeout="5000"
            >
              {{ pw.errors }}

              <template v-slot:actions>
                <v-btn
                    @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

          </v-card-text>
          <v-card-text>
            <v-btn color="primary" @click="changePassword">Save changes</v-btn>
          </v-card-text>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
      tab: null,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
      form: {
        first_name: "",
        surname: null,
        last_name: null,
        email: "",
        role: null,
        avatar: null,
        mobile: null,
        gender: null,
        birthday: null,
        location: null
      },
      isSelecting: false,
      selectedFile: null,

      pw: {
        current_password: null,
        new_password: null,
        new_password_confirmation: null,
        errors: null
      },

      snackbar: false,
      timeout: 2000,
    }
  },
  async created() {
    if (this.$store.state.account.user.email == null) {
      await this.getUser();
    }
    await this.resetForm();
  },
  methods: {
    resetForm() {
      this.form = Object.assign({}, this.$store.state.account.user);
      this.form.email = this.$store.state.account.user.email;
    },
    async getUser() {
      await this.$store.dispatch('account/getUser');
    },

    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, {once: true});
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      this.form.avatar = URL.createObjectURL(this.selectedFile);
    },

    updateProfile() {
      this.$store.dispatch('account/updateProfile', {
        first_name: this.form.first_name,
        surname: this.form.surname,
        last_name: this.form.last_name,
        email: this.form.email,
        avatar: this.selectedFile,
        mobile: this.form.mobile,
        gender: this.form.gender === 'Male' ? 0 : 1,
        birthday: this.form.birthday
      }).then(response => {
        this.$root.vtoast.show({message: response.data.message})
        this.$store.dispatch('account/getUser');
      })
          .catch(error => {
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'})
          })
    },

    changePassword() {
      this.$store.dispatch('account/changePassword', {
        current_password: this.pw.current_password,
        new_password: this.pw.new_password,
        new_password_confirmation: this.pw.new_password_confirmation
      }).then(response => {
        this.$root.vtoast.show({message: response.data.message})
      })
          .catch(error => {
            console.log(error);
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'})
          })
    },
  }
}
</script>