<template>
  <v-container>
    <v-card>
      <v-card-header>
        <v-card-title>Dashboard</v-card-title>
      </v-card-header>
      <v-card-text>
        <EstablishmentDetails></EstablishmentDetails>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Setting from "@/views/Setting";
import ListUser from "@/views/Manager/ListUser";
export default {
  name: "DashBoard",
  components: {ListUser, Setting}
}
</script>

<style scoped>

</style>