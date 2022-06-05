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
              type="text"
              placeholder="Search..."
              variant="outlined"
              density="compact"
              hide-details
              color="primary"
              @keyup.prevent="handlePerPage"
          />
        </v-col>
      </v-row>
    </v-card-text>


    <v-card-text>
      <v-table fixed-header>
        <thead class="text-uppercase text-primary">
        <tr>
          <th>No</th>
          <th v-for="column in columns" scope="col" @click="updateSortColumn(column)" class="text-no-wrap">
            {{column}}
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
          <td class="text-primary">{{index + perPage * (page - 1)}}</td>
          <td>{{ data['name'] }}</td>
          <td>{{ data['owner'] }}</td>
          <td>{{ data['address'] }}</td>
          <td>{{ data['telephone'] }}</td>
          <td>{{ data.certificates}}</td>
        </tr>

        </tbody>
      </v-table>

      {{Object.keys(tableData)[0]}}
    </v-card-text>

    <v-card-actions>
      <div class="ml-3 text-primary">
        <label class="mt-2 mr-2 text-caption text-sm-start text-no-wrap" for="pageOption">Rows per page</label>
        <select v-model="perPage" id="pageOption" class="bg-white" @change="handlePerPage">
          <option v-for="page in pageOptions" :key="page" :value="page">{{ page }}</option>
        </select>
      </div>
      <v-spacer></v-spacer>
      <v-pagination
          color="primary"
          density="comfortable"
          border
          class="me-2"
          v-model="page"
          :length="this.pagination.last_page"
          total-visible="3"
          @click="handlePageChange"
      ></v-pagination>
    </v-card-actions>
  </v-card>

  <v-btn @click="getEstablishmentDetails">dwadw</v-btn>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      tableData: [],
      sortOrder: 'asc',
      search: null,
      pageOptions: [5, 10, 20, 50],
      perPage: 10,
      page: 1,
      pagination: {to: 1, from: 1},

      url: "http://localhost:8000/api/establishments",
      columns: ['Name of food establishment', 'Owner', 'Address', 'Telephone', 'Reg. No'],
      sortField: null,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      console.log('TEST' + this.perPage);
      try {
        const params = {
          sort_field: this.sortField,
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

    getEstablishmentDetails() {
      axios.get('/users')
          .then(response => {
            this.$router.push({name: 'EstablishmentDetails', params: { id: "ddfdfd" } });
          })
          .catch(error => {

          })
    }
  },
}
</script>
