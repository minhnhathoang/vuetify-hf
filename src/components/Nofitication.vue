<template>
  <div>
    <v-btn
        icon=""

    >
      <v-badge color="error" dot>
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>
    <v-menu activator="parent">
      <v-list class="nofi" max-height="500" width="350">
        <h3 class="mx-4 mb-3">Notifications</h3>
        <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
        >
          <div class="">
            <div class="d-flex">
              <div class=""><v-avatar color="accent" size="50px"><img src="https://picsum.photos/200/300?random=1"></v-avatar></div>
              <div>
               <div class="mx-2"><strong>Hoang Minh Nhat</strong> Posted in K65-CLC UET Posted in K65-CLC UET Posted in K65-CLC UET</div>
                <div class="mx-2 text-caption text-no-wrap">2h ago</div>
              </div>
            </div>
            <v-divider class="my-2"></v-divider>
          </div>
        </v-list-item>

      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Profile' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
      { title: 'Logout' },
    ],
  }),
}
</script>

<style>
.nofi {
  transform: translate(-230px, 7px);

}

</style>