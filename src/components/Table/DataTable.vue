<template>
  <v-card elevation="0">
    <v-card-text>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="search"
              color="primary"
              density="compact"
              hide-details
              placeholder="Search..."
              type="text"
              variant="outlined"
              @keyup.prevent="handlePerPage"
          />
        </v-col>
      </v-row>
    </v-card-text>


    <v-card-text>
      <v-table density="compact" fixed-header>
        <thead>
        <tr>
          <th>No</th>
          <th v-for="column in columns" class="text-no-wrap" scope="col" @click="updateSortColumn(column)">
            {{ column.toUpperCase().replace('_', ' ') }}
            <span v-if="column === sortField">
          <v-icon v-if="sortOrder === 'asc'">mdi-arrow-down</v-icon>
          <v-icon v-else>mdi-arrow-up</v-icon>
            </span>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="tableData.length === 0">No Records found</tr>
        <tr v-for="(data, index) in tableData" v-else>
          <td class="text-primary">
            <a @click="getUserDetails(data['id'])">{{ index + perPage * (page - 1) }}</a>
          </td>
          <td>
            <v-avatar rounded size="100">
              <v-img :src="data['avatar']"></v-img>
            </v-avatar>
          </td>
          <td v-for="column in columns">{{ data[column] }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>

    <v-card-actions>
      <div class="ml-3 text-primary">
        <!--        <div class="text-caption text-no-wrap text-primary">Rows per page</div>-->
        <!--        <v-select-->
        <!--            transition-->
        <!--            :items="pageOptions"-->
        <!--            v-model="perPage"-->
        <!--            @update:modelValue="handlePerPage"-->
        <!--            density="compact"-->
        <!--            variant="plain"-->
        <!--            rounded-->
        <!--            menu-icon=""-->
        <!--        ></v-select>-->
        <label class="mt-2 mr-2 text-caption text-sm-start text-no-wrap" for="pageOption">Rows per page</label>
        <select id="pageOption" v-model="perPage" class="bg-white" @change="handlePerPage">
          <option v-for="page in pageOptions" :key="page" :value="page">{{ page }}</option>
        </select>
      </div>
      <v-spacer></v-spacer>
      <v-pagination
          v-model="page"
          :length="this.pagination.last_page"
          border
          class="me-2"
          color="primary"
          density="comfortable"
          total-visible="3"
          @click="handlePageChange"
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>

<script>

import axios from "axios";
import router from "@/router";

export default {
  name: 'DataTable',
  data() {
    return {
      tableData: [],
      sortField: this.columns[0],
      sortOrder: 'asc',
      search: null,
      pageOptions: [5, 10, 20, 50],
      perPage: 10,
      page: 1,
      pagination: {to: 1, from: 1},
    }
  },
  props: {
    url: {type: String, required: true},
    columns: {type: Array, required: true},
  },
  created() {

    this.fetchData()
  },
  methods: {
    async fetchData() {
      console.log('TEST' + this.perPage);
      try {
        const params = {
          sort_field: this.sortField === 'full_name' ? 'first_name' : this.sortField,
          sort_order: this.sortOrder,
          search: this.search,
          per_page: this.perPage,
          page: this.page
        }
        const {data} = await axios.get(this.url, {params})
        console.log(data.data);
        this.tableData = data.data
        this.pagination = data.meta
      } catch (e) {
        console.log("error" + e)
      }
    },
    updateSortColumn(column) {
      if (column === this.sortField) {
        this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc'
      } else {
        this.sortField = column
        this.sortOrder = 'asc'
      }
      this.fetchData()
    },
    handleSearch() {
      this.sortField = this.columns[0]
      this.sortOrder = "asc"
      this.page = 1
      this.fetchData()
    },
    handlePerPage() {
      this.page = 1;
      this.fetchData();
    },
    handlePageChange() {
      this.fetchData()
    },

    getUserDetails(id) {
      router.push({name: 'UserDetails', params: {id: id}});
    }
  },
}
</script>
