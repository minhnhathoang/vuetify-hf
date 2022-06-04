<template>
  <data-table :columns="['full_name', 'email', 'role', 'mobile', 'address','joined_on']"
      url="http://localhost:8000/api/users"
  ></data-table>
</template>

<script>

import axios from "axios";
import DataTable from "@/components/Table/DataTable";

export default {
  components: {DataTable},
}
</script>
