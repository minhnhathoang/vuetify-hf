<template>
  <div class="d-flex">
    <div class="align-self-end mx-2 hidden-sm-and-down">
      <div class="text-no-wrap text-subtitle-2 text-primary">{{ user.full_name }}</div>
      <div class="float-right text-no-wrap text-medium-emphasis text-caption">{{user.role}}</div>
    </div>
        <v-menu transition="slide-x-transition">
          <template v-slot:activator="{ props }">
            <v-btn
                icon
                v-bind="props">
            <v-avatar>
              <v-img :src="user.avatar" height="100%" cover></v-img>
            </v-avatar>
            </v-btn>
          </template>
          <v-list class="elevation-1 rounded-b-lg my-list" width="200">
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                class="mt-2 elevation-0"
                slot-scope="{ hover }"
            >
                <v-icon class="mr-3">{{ item.icon }}</v-icon>
                <v-list-item-title >{{ item.text }}</v-list-item-title>
            </v-list-item>


            <v-list-item to="/account/setting" class="mt-2 elevation-0">
              <v-icon class="mr-3">mdi-cog-outline</v-icon>
              <v-list-item-title >Setting</v-list-item-title>
            </v-list-item>


            <v-list-item @click="logout" class="border-t mt-3">
              <v-icon class="mr-3">mdi-logout</v-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>

          </v-list>
        </v-menu>
  </div>
</template>

<script>

import {mapState} from "vuex";

export default {
  data: () => ({
    items: [
      { text: 'Profile', icon: 'mdi-account-outline' },
      { text: 'Help & Support', icon: 'mdi-help-circle-outline' },
    ],
  }),
  computed: {
    ...mapState('account', ['user'])
  },
  created() {
    this.$store.dispatch('account/getUser');
  },
  methods: {
    logout() {
      this.$store.dispatch('account/logout');
    },
  }
}
</script>

<style>
.my-list {
  transform: translate(-150px, 15px);
}
</style>
