<template>
  <v-card v-if="user" class="ma-sm-5 w-75">
    <v-card-content class="d-sm-flex d-block">

      <div class="d-sm-flex d-block mt-5">
        <v-avatar color="white" size="100">
          <v-img v-if="user != null && user.avatar != null" :src="user.avatar" cover height="100%"></v-img>
        </v-avatar>

        <div class="px-5 align-center justify-center">
          <div class="font-weight-medium text-no-wrap"> {{ user.full_name }}</div>
          <div class="py-2">

            <v-chip
                color="primary"
                class="font-weight-bold ma-2"
            >
              {{ user.role }}
              <v-icon end icon="mdi-account-outline"></v-icon>
            </v-chip></div>

          <!--          <div class=""> <strong>ID: </strong>  #23232 </div>-->
        </div>
      </div>
      <v-spacer></v-spacer>
      <div>

        <div>
          <v-table density="compact">

            <tbody>
            <tr>
              <td class="font-weight-medium">Email</td>
              <td class="text-accent">{{ user.email }}</td>
            </tr>
            <tr>
              <td class="font-weight-medium">Phone</td>
              <td>{{ user.mobile }}</td>
            </tr>
            <tr>
              <td class="font-weight-medium">Birthday</td>
              <td>{{ user.birthday }}</td>
            </tr>
            <tr>
              <td class="font-weight-medium">Address</td>
              <td>{{ user.address }}</td>
            </tr>
            <tr>
              <td class="font-weight-medium">Gender</td>
              <td>{{ user.gender }}</td>
            </tr>
            <tr>
              <td class="font-weight-medium">Location</td>
              <td>{{ user.location }}</td>
            </tr>
            </tbody>
          </v-table>
        </div>
      </div>
    </v-card-content>

  </v-card>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      user: null,
      id: this.$route.params.id
    }
  },

  created() {
    this.getUserDetails();
  },
  methods: {
    getUserDetails() {
      axios.get('/user/details/' + this.id)
          .then(response => {
            console.log(response)
            this.user = response.data.profile
            console.log('AAAA222' + response);
          })
          .catch(error => {
            alert("USERLIST->USERDETAILS" + error);
          })
    }
  }

}
</script>

<style lang="scss" scoped>
tbody {
  tr:hover {
    background-color: transparent !important;
  }

  tr {
    --v-border-color: white !important;
  }
}
</style>
