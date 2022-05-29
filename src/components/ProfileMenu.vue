<template>
  <div>
      <v-btn
          color="primary"
          icon
      >
        <v-avatar color="primary">48</v-avatar>
      </v-btn>
        <v-menu activator="parent">
          <v-list class="my-list elevation-1 rounded-b-lg" density="" width="250">
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                class="mt-2 elevation-0"
                slot-scope="{ hover }"
                :class="[item.text === 'Log out' ? 'border-t mt-2' : '']"
            >
                <v-icon class="mr-3">{{ item.icon }}</v-icon>
                <v-list-item-title >{{ item.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { text: 'Profile', icon: 'mdi-account-outline' },
      { text: 'Setting', icon: 'mdi-cog-outline' },
      { text: 'Help & Support', icon: 'mdi-help-circle-outline' },
      { text: 'Log out', icon: 'mdi-logout' },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style>
.my-list {
  transform: translate(-200px, 7px);
  width: 250px;
}
</style>
