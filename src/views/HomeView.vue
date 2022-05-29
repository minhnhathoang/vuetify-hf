<!--<template>-->
<!--  <v-card>-->
<!--    <v-layout>-->
<!--      <v-app-bar-->
<!--          color="white"-->
<!--          permanent-->
<!--          class="elevation-0 border-b position-fixed"-->
<!--      >-->
<!--        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
<!--        <v-toolbar-title>Healthy first</v-toolbar-title>-->

<!--        <profile-menu></profile-menu>-->
<!--      </v-app-bar>-->

<!--      <v-navigation-drawer-->
<!--          v-model="drawer"-->
<!--      >-->
<!--        <side-bar></side-bar>-->
<!--      </v-navigation-drawer>-->

<!--      <v-navigation-drawer v-model="drawer" color="grey-darken-2" position="right"></v-navigation-drawer>-->

<!--      <v-main class="h-screen">-->
<!--        <slot>-->
<!--        </slot>-->
<!--      </v-main>-->
<!--    </v-layout>-->
<!--  </v-card>-->
<!--</template>-->

<!--<script>-->
<!--import LogoApp from "@/components/LogoApp";-->
<!--import SideBar from "@/components/SideBar";-->
<!--import ProfileMenu from "@/components/ProfileMenu";-->
<!--import TestMain from "@/views/TestMain";-->
<!--export default {-->
<!--  components: {TestMain, ProfileMenu, SideBar, LogoApp},-->
<!--  data: () => ({-->
<!--    drawer: false,-->
<!--    group: null,-->
<!--  }),-->

<!--  watch: {-->
<!--    group() {-->
<!--      this.drawer = false-->
<!--    },-->
<!--  },-->

<!--  methods: {-->
<!--    logout() {-->
<!--      this.$store.dispatch("LOGOUT")-->
<!--          .then(success => {-->
<!--            console.log('AAAAAAAAA');-->
<!--          })-->
<!--          .catch(error => {-->
<!--            this.errors = "Invalid";-->
<!--            console.log(error);-->
<!--          })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
