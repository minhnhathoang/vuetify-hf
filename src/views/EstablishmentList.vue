<template>
  <v-card elevation="0">
    <v-card-header>
      <v-card-title>Establishment List</v-card-title>
    </v-card-header>
    <v-divider></v-divider>
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
        <v-col
            cols="12"
            md="4"
        >
          <v-select
              v-model="filter"
              :items="['Default', 'Active', 'Expired', 'Revoked', 'Not Certificate']"
              color="primary"
              dense
              density="compact"
              label="Certificate Filter"
              menu-icon="mdi-filter-variant"
              outlined
              variant="outlined"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>


    <v-card-text>
      <v-table fixed-header>
        <thead class="text-uppercase text-primary">
        <tr>
          <th>No</th>

          <!--          <th v-for="column in columns" scope="col" @click="updateSortColumn(column)" class="text-no-wrap">-->
          <!--            {{ column }}-->
          <!--            <span v-if="column === sortField">-->
          <!--              <v-icon v-if="sortOrder === 'asc'">mdi-arrow-down</v-icon>-->
          <!--              <v-icon v-else>mdi-arrow-up</v-icon>-->
          <!--            </span>-->
          <!--          </th>-->

          <th class="text-no-wrap" scope="col" @click="updateSortColumn('name')">
            Name of food establishment
            <span v-if="'name' === sortField">
              <v-icon v-if="sortOrder === 'asc'">mdi-arrow-down</v-icon>
              <v-icon v-else>mdi-arrow-up</v-icon>
            </span>
          </th>

          <th class="text-no-wrap" scope="col" @click="updateSortColumn('owner')">
            Owner
            <span v-if="'owner' === sortField">
              <v-icon v-if="sortOrder === 'asc'">mdi-arrow-down</v-icon>
              <v-icon v-else>mdi-arrow-up</v-icon>
            </span>
          </th>

          <th class="text-no-wrap" scope="col" @click="updateSortColumn('kind_of_business')">
            Kind of business
            <span v-if="'kind_of_business' === sortField">
              <v-icon v-if="sortOrder === 'asc'">mdi-arrow-down</v-icon>
              <v-icon v-else>mdi-arrow-up</v-icon>
            </span>
          </th>

          <th class="text-no-wrap" scope="col" @click="updateSortColumn('address')">
            Address
            <span v-if="'address' === sortField">
              <v-icon v-if="sortOrder === 'asc'">mdi-arrow-down</v-icon>
              <v-icon v-else>mdi-arrow-up</v-icon>
            </span>
          </th>

          <th class="text-no-wrap" scope="col">
            Description
          </th>

          <th class="text-no-wrap" scope="col" @click="updateSortColumn('certificates.registration_number')">
            Reg. No
            <span v-if="'certificates.registration_number' === sortField">
              <v-icon v-if="sortOrder === 'asc'">mdi-arrow-down</v-icon>
              <v-icon v-else>mdi-arrow-up</v-icon>
            </span>
          </th>

        </tr>
        </thead>
        <tbody>
        <tr v-if="tableData.length === 0" class="text-error">
          <td class="text-center" colspan="6">No Records found</td>
        </tr>

        <tr v-for="(data, index) in tableData" v-else>
          <td class="text-primary">
            <a @click="getEstablishmentDetails(data['id'])">{{ index + perPage * (page - 1) }}</a>
          </td>
          <td class="font-weight-medium">{{ data['name'] }}</td>
          <td>{{ data['owner'] }}</td>
          <td>{{ data['kind_of_business'] }}</td>
          <td>{{ data['address'] }}</td>
          <td>{{ data['description'] }}</td>
          <td v-if="data['certificate']" class="text-success font-weight-bold">
            <v-chip v-if="data['certificate']['is_revoked']" class="font-weight-bold" color="error" size="small">
              #{{ data['certificate']['registration_number'] }} Revoked
            </v-chip>
            <v-chip v-else-if="data['certificate']['is_expired']" class="font-weight-bold" color="secondary"
                    size="small">
              #{{ data['certificate']['registration_number'] }} Expried
            </v-chip>
            <v-chip v-else class="font-weight-bold" color="success" size="small">
              #{{ data['certificate']['registration_number'] }} Active
            </v-chip>
          </td>
          <td v-else></td>
        </tr>

        </tbody>
      </v-table>
    </v-card-text>

    <v-card-actions>
      <div class="ml-3 text-primary">
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
      sortField: 'name',
      filter: 'Default',
      // sortField: 'registration_number',

      url: "http://localhost:8000/api/establishments",
      columns: ['Name of food establishment', 'Owner', 'Kind of business', 'Address', 'Reg. No'],
    }
  },
  watch: {
    filter: {
      handler() {
        this.sortOrder = "asc"
        this.page = 1
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const params = {
          sort_field: this.sortField,
          sort_order: this.sortOrder,
          search: this.search,
          per_page: this.perPage,
          page: this.page,
          filter: this.filter
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
    getEstablishmentDetails(id) {
      this.$router.push({name: 'EstablishmentDetails', params: {id: id}});
    }
  },
}
</script>

<style scoped>
.v-table >>> th {
  font-size: 0.8rem !important;
  background-color: #fafafa !important;
}
</style>