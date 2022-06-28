<template>
  <v-list nav>
    <v-list-subheader class="text-uppercase">General</v-list-subheader>

    <!--    General-->
    <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :prepend-icon="item.icon"
        :to="item.link"
        :value="item"
        active-color="primary"
    >
      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>


    <!--    User Management-->
    <v-list-group v-if="this.$store.state.account.user.role === 0">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" active-color="primary" prepend-icon="mdi-account-group-outline"
                     title="User"></v-list-item>
      </template>
      <v-list-item
          v-for="([title, icon, link], i) in userManagement"
          :key="i"
          :title="title"
          :to="link"
          :value="title"
          active-color="primary"
      ></v-list-item>
    </v-list-group>

    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" active-color="primary" prepend-icon="mdi-warehouse"
                     title="Establishment"></v-list-item>
      </template>

      <v-list-item
          v-for="([title, icon, link], i) in establishment"
          :key="i"
          :title="title"
          :to="link"
          :value="title"
          active-color="primary"
      ></v-list-item>
    </v-list-group>

    <!--    &lt;!&ndash;    Certifies Management&ndash;&gt;-->
    <!--    <v-list-group>-->
    <!--      <template v-slot:activator="{ props }">-->
    <!--        <v-list-item v-bind="props" title="Certifies" active-color="primary"-->
    <!--                     prepend-icon="mdi-clipboard-search-outline"></v-list-item>-->
    <!--      </template>-->

    <!--      <v-list-item-->
    <!--          v-for="([title, icon], i) in certifies"-->
    <!--          :key="i"-->
    <!--          :value="title"-->
    <!--          :title="title"-->
    <!--          active-color="primary"-->
    <!--      ></v-list-item>-->
    <!--    </v-list-group>-->

    <!--    Help & Support-->
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" active-color="primary" prepend-icon="mdi-help-circle-outline"
                     title="Help & Support"></v-list-item>
      </template>

      <v-list-item
          v-for="([title, icon], i) in healAndSupport"
          :key="i"
          :title="title"
          :value="title"
          active-color="primary"
      ></v-list-item>
    </v-list-group>

    <v-list-subheader v-if="this.$store.state.account.user.role === 'Admin'" class="text-uppercase mt-5">Admintration
    </v-list-subheader>

    <v-list-group v-if="this.$store.state.account.user.role === 'Admin'">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" active-color="primary" prepend-icon="mdi-account-group-outline"
                     title="User"></v-list-item>
      </template>
      <v-list-item
          v-for="([title, icon, link], i) in userManagement"
          :key="i"
          :title="title"
          :to="link"
          :value="title"
          active-color="primary"
      ></v-list-item>
    </v-list-group>

    <!--    <v-list-item v-bind="props" title="Recent activity" value="Recent_activity" active-color="primary" prepend-icon="mdi-bell-outline"></v-list-item>-->
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: [
      {text: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/'},
      {text: 'Calender', icon: 'mdi-calendar-month-outline', link: '/calendar'},
    ],
    userManagement: [
      ['User List', 'mdi-account-multiple-outline', '/user/list'],
    ],
    establishment: [
      ['Establishment List', 'mdi-google-my-business-outline', '/establishment/list'],
      ['Add New Establishment', 'mdi-google-my-business-outline', '/establishment/add'],
    ],
    healAndSupport: [
      ['Support inbox', 'mdi-account-multiple-outline'],
      ['Report a problem', 'mdi-cog-outline'],
    ],
  }),
}
</script>