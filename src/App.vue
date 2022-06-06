<template>
  <v-app>
    <component :is="resolveLayout"></component>
  </v-app>
  <vtoast ref="vtoast"/>
</template>

<script>

import AuthLayout from "@/components/layouts/AuthLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import vtoast from "@/components/vtoast";
import router from "@/router";
import {computed} from "vue";

export default {
  components: {
    AuthLayout,
    DashboardLayout,
    vtoast
  },
  setup() {
    const resolveLayout = computed(() => {
      if (router.currentRoute.value.meta.layout === 'blank' || router.currentRoute.value.meta.layout === undefined) return 'auth-layout';
      return 'dashboard-layout'
    })
    return {
      resolveLayout,
    }
  },
  mounted() {
    this.$root.vtoast = this.$refs.vtoast
  },
}

</script>

