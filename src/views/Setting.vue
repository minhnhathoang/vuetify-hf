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
        <v-card elevation="0" class="ma-sm-5">
          <v-card-content class="d-flex align-center">
            <v-avatar color="primary" size="140" rounded="0">
              <v-img :src="form.avatar" height="100%" cover></v-img>
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

              <v-btn size="small" color="primary" variant="outlined" :loading="isSelecting"
                     @click="handleFileImport">
                Upload new photo
              </v-btn>

              <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  @change="onFileChanged"
              >
              <div class="text-caption text-high-emphasis pa-2 hidden-sm-and-down">Allowed JPG, GIF or PNG</div>
            </div>

          </v-card-content>

          <v-card-text class="v-col-12">
            <v-row>
              <div class="v-col-md-4 v-col-12">
                <v-text-field
                    v-model="form.first_name"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    color="primary"
                    hide-details="auto"
                    density="compact"/>
              </div>
              <div class="v-col-md-4 v-col-12">
                <v-text-field
                    v-model="form.surname"
                    type="text"
                    label="Surname"
                    variant="outlined"
                    color="primary"
                    hint="At least 8 characters"
                    hide-details="auto"
                    density="compact"/>
              </div>
              <div class="v-col-md-4 v-col-12">
                <v-text-field
                    v-model="form.last_name"
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    color="primary"
                    hide-details="auto"

                    density="compact"/>
              </div>
              <div class="v-col-md-6 v-col-12">
                <v-text-field
                    v-model="form.email"
                    type="email"
                    label="Email" append-inner-icon="mdi-email"
                    placeholder="john@example.com"
                    variant="outlined"
                    density="compact"/>
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
        <v-card elevation="0" class="ma-sm-5">
          <v-card-text class="v-col-md-5 v-col-sm-7">
                <v-text-field
                    v-model="pw.current_password"
                    type="password"
                    label="Current Password" append-inner-icon="mdi-lock"
                    variant="outlined"
                    density="compact"/>
                <v-text-field
                    v-model="pw.new_password"
                    type="password"
                    label="New Password" append-inner-icon="mdi-lock"
                    variant="outlined"
                    hint="Make sure it's at least 8 characters."
                    density="compact"/>
                <v-text-field
                    v-model="pw.new_password_confirmation"
                    type="password"
                    label="Confirm New Password" append-inner-icon="mdi-lock"
                    variant="outlined"
                    density="compact"/>

            <v-snackbar
                v-model="snackbar"
                timeout="5000"
                location="center"
                color="error"
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
        first_name: "He",
        surname: null,
        last_name: null,
        email: "SDSD@@",
        role: null,
        avatar: null,
        mobile: null,
        gender: null,
        birthday: null,
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
      text: 'My timeout is set to 2000.',
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
      });
    },

    changePassword() {
      this.$store.dispatch('account/changePassword', {
        current_password: this.pw.current_password,
        new_password: this.pw.new_password,
        new_password_confirmation: this.pw.new_password_confirmation
      }).catch(error => {
        this.pw.errors = error;
        console.log("change" + this.pw.error);
        this.snackbar = true;
      });
    },
  }
}
</script>