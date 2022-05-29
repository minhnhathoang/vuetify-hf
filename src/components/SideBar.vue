<template>
  <v-list nav>
    <v-list-subheader>General</v-list-subheader>

    <!--    General-->
    <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        active-color="primary"
        :prepend-icon="item.icon"
        :to="item.link"
    >
      <v-list-item-title v-text="item.text"></v-list-item-title>
    </v-list-item>


    <!--    User Management-->
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="User Management" active-color="primary"
                     prepend-icon="mdi-account-group-outline"></v-list-item>
      </template>
      <v-list-item
          v-for="([title, icon, link], i) in userManagement"
          :key="i"
          :value="title"
          :title="title"
          :to="link"
          active-color="primary"
      ></v-list-item>
    </v-list-group>

    <!--    Certifies Management-->
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Certifies Management" active-color="primary"
                     prepend-icon="mdi-clipboard-search-outline"></v-list-item>
      </template>

      <v-list-item
          v-for="([title, icon], i) in certifies"
          :key="i"
          :value="title"
          :title="title"
          active-color="primary"
      ></v-list-item>
    </v-list-group>

    <!--    Help & Support-->
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Help & Support" active-color="primary"
                     prepend-icon="mdi-help-circle-outline"></v-list-item>
      </template>

      <v-list-item
          v-for="([title, icon], i) in healAndSupport"
          :key="i"
          :value="title"
          :title="title"
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
    ],
    userManagement: [
      ['User list', 'mdi-account-multiple-outline', '/user/list'],
      ['User view', 'mdi-cog-outline', '/user/view'],
      ['Add new user', 'mdi-cog-outline', '/user/add'],
    ],
    certifies: [
      ['List', 'mdi-account-multiple-outline'],
      ['Report a problem', 'mdi-cog-outline'],
    ],
    healAndSupport: [
      ['Support inbox', 'mdi-account-multiple-outline'],
      ['Report a problem', 'mdi-cog-outline'],
    ],
  }),
}
</script>