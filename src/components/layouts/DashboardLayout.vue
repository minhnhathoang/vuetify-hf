<template>
  <v-layout>
    <v-app-bar
        app
        class="elevation-0 border-b justify-center position-fixed"
    >
      <!--                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" slot >-->
      <!--                </v-app-bar-nav-icon>-->

      <v-btn icon>
        <logo-app width="45px" @click.stop="drawer = !drawer"></logo-app>
      </v-btn>
      <v-toolbar-title class="mx-2 font-weight-medium text-uppercase">Healthy first</v-toolbar-title>

      <language></language>
      <nofitication></nofitication>
      <v-divider class="mx-2" vertical></v-divider>
      <profile-menu></profile-menu>
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
        class="position-fixed overflow-y-auto"
        height="100vh"
        width="300"
    >
      <side-bar></side-bar>
    </v-navigation-drawer>

    <v-main>
      <div>
        <router-view></router-view>
      </div>
    </v-main>
    <CFooter></CFooter>
  </v-layout>
</template>

<script>
import LogoApp from "@/components/LogoApp";
import SideBar from "@/components/SideBar";
import ProfileMenu from "@/components/ProfileMenu";
import CFooter from "@/components/layouts/CFooter";
import Language from "@/components/Language";
import AddUser from "@/views/Manager/AddUser";
import {Calendar} from "v-calendar";

export default {
  components: {AddUser, Language, CFooter, ProfileMenu, SideBar, LogoApp, Calendar},
  data: () => ({
    drawer: true,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("LOGOUT")
          .then(success => {
            console.log('AAAAAAAAA');
          })
          .catch(error => {
            this.errors = "Invalid";
            console.log(error);
          })
    },
  }
}
</script>
