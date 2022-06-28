<template>
  <v-card elevation="0">
    <v-card-header>
      <v-card-title>User List</v-card-title>
    </v-card-header>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col
            cols="6"
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
        <v-spacer></v-spacer>
        <v-col cols="12"
               md="2">

          <v-dialog
              v-model="dialog"
              class="my-sm-10 my-0"
              fullscreen
              max-width="600"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                  v-bind="props"
                  color="primary"
              >
                Add new user
              </v-btn>
            </template>
            <v-card class="border-sm rounded-lg align-self-center">
              <v-card-text class="d-flex">
                <v-toolbar-title class="font-weight-medium">Add user</v-toolbar-title>
                <v-btn flat icon="mdi-close" @click="dialog = !dialog">Close</v-btn>
              </v-card-text>

              <v-card-text>
                <div class="align-content-space-between d-sm-flex">
                  <v-text-field
                      v-model="form.first_name"
                      color="primary"
                      density="compact"
                      label="First Name"
                      type="text"
                      variant="outlined"/>
                  <v-text-field
                      v-model="form.surname"
                      class="mx-sm-3"
                      color="primary"
                      density="compact"
                      label="Surname"
                      type="text"
                      variant="outlined"/>
                  <v-text-field
                      v-model="form.last_name"
                      color="primary"
                      density="compact"
                      label="Last Name"
                      type="text"
                      variant="outlined"/>
                </div>
                <v-text-field
                    v-model="form.email"
                    append-inner-icon="mdi-email"
                    color="primary" density="compact"
                    label="Email"
                    placeholder="john@example.com"
                    type="email"
                    variant="outlined"/>

                <v-text-field
                    v-model="form.mobile"
                    append-inner-icon="mdi-phone"
                    color="primary" density="compact"
                    label="Mobile"
                    type="number"
                    variant="outlined"/>

                <div class="d-flex mb-5">
                  <v-text-field
                      v-model="form.birthday"
                      color="primary"
                      density="compact"
                      hide-details
                      label="Birthday"
                      outlined
                      type="date"
                      variant="outlined"
                  />
                  <v-radio-group v-model="form.gender" class="d-flex" inline>
                    <v-radio color="primary" value="0">
                      <template v-slot:label class="">
                        Male
                      </template>
                    </v-radio>
                    <v-radio color="primary" value="1">
                      <template v-slot:label>
                        Female
                      </template>
                    </v-radio>
                  </v-radio-group>
                </div>
                <v-select
                    v-model="form.location"
                    :items="this.$store.state.gso.provinces"
                    color="primary"
                    dense
                    density="compact"
                    label="Location"
                    outlined
                    variant="outlined"
                ></v-select>

                <v-radio-group v-model="form.role" inline>
                  <template v-slot:label>
                    <div class="mb-4"><strong>Choose a user role</strong></div>
                  </template>
                  <v-radio color="primary" value="0">
                    <template v-slot:label>
                      Admin
                    </template>
                  </v-radio>
                  <v-radio color="primary" value="1">
                    <template v-slot:label>
                      Specialist
                    </template>
                  </v-radio>
                </v-radio-group>

              </v-card-text>

              <v-card-text>
                <v-spacer></v-spacer>
                <v-btn
                    :disabled="dialog1"
                    :loading="dialog1"
                    class="bg-primary text-white"
                    @click="addUser"
                >
                  Add new user
                </v-btn>
                <v-dialog
                    v-model="dialog1"
                    hide-overlay
                    persistent
                >
                  <v-progress-circular
                      :size="50"
                      color="primary"
                      indeterminate
                  ></v-progress-circular>
                </v-dialog>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card-text>
    <!--///////////-->

    <v-card-text>
      <v-table fixed-header>
        <thead class="text-uppercase text-primary">
        <tr>
          <th>No</th>
          <th v-for="column in columns" class="text-no-wrap" scope="col" @click="updateSortColumn(column)">
            {{ column.toUpperCase().replace('_', ' ') }}
            <span v-if="column === sortField">
          <v-icon v-if="sortOrder === 'asc'">mdi-arrow-down</v-icon>
          <v-icon v-else>mdi-arrow-up</v-icon>
            </span>
          </th>
          <th>
            ACTIONS
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="tableData.length === 0" class="text-error">
          <td class="text-center" colspan="6">No Records found</td>
        </tr>
        <tr v-for="(data, index) in tableData" v-else>
          <td class="text-primary">
            <a @click="getUserDetails(data['id'])">{{ index + perPage * (page - 1) }}</a>
          </td>

          <td class=" align-center">

            <div class="d-flex align-center">
              <v-avatar v-if="data['avatar']" color="primary" size="small">
                <v-img :src="data['avatar']"></v-img>
              </v-avatar>

              <v-avatar v-else color="primary" size="small">
                {{ data['full_name'].charAt(0) }}
              </v-avatar>

              <div class="ml-2">
                <div class="font-weight-medium text-no-wrap align-self-end">{{ data['full_name'] }}</div>
                <div class="text-no-wrap text-medium-emphasis align-self-end">{{ data['email'] }}</div>
              </div>
            </div>
          </td>

          <td>
            <v-chip :color="data['role'] === 'Admin' ? 'primary' : 'warning'" class="font-weight-bold" size="small">
              {{ data['role'] }}
            </v-chip>
          </td>
          <td class="text-no-wrap">
            {{ data['location'] }}
          </td>
          <td class="text-no-wrap">
            {{ data['mobile'] }}
          </td>
          <td>
            {{ data['address'] }}
          </td>
          <td>
            {{ data['joined_on'] }}
          </td>
          <td class="text-no-wrap">
            <v-btn color="accent" elevation="0" icon="mdi-eye-outline" size="x-small"
                   variant="text" @click="getUserDetails(data['id'])">
            </v-btn>

            <v-btn color="error" elevation="0" icon="mdi-trash-can-outline" size="x-small"
                   variant="text"
                   @click="askDeleteUser(data['id'])">
            </v-btn>
          </td>
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

  <v-dialog
      v-model="dialog_delete_user"
  >
    <v-card>
      <v-card-title>
        Are you sure delete this users ?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="secondary"
            text
            @click="dialog_delete_user = false"
        >
          Cancel
        </v-btn>
        <v-btn
            color="error"
            text
            @click="deleteUser"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>

import axios from "axios";
import DataTable from "@/components/Table/DataTable";
import AddUser from "@/views/FormAddUser";
import {DatePicker} from "v-calendar";
import router from "@/router";

export default {
  components: {AddUser, DataTable, DatePicker},
  data: () => ({
    tableData: [],
    sortField: 'role',
    sortOrder: 'asc',
    search: null,
    pageOptions: [5, 10, 20, 50],
    perPage: 10,
    page: 1,
    pagination: {to: 1, from: 1},

    url: "http://localhost:8000/api/users",
    columns: ['full_name', 'role', 'location', 'mobile', 'address', 'joined_on'],

    form: {
      first_name: null,
      surname: null,
      last_name: null,
      email: null,
      mobile: null,
      role: null,
      birthday: null,
      gender: null,
      location: null
    },
    timeout: 2000,
    errors: null,

    dialog1: false,
    dialog: false,
    dialog_delete_user: false,
    selected_user: null,
  }),
  created() {
    this.fetchData();
    this.$store.dispatch('gso/getProvinces');
  },
  watch: {
    dialog(val) {
      if (!val) return
      setTimeout(() => (this.dialog1 = false), 1000)
    },
  },
  methods: {
    async fetchData() {
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
    },

    addUser() {
      axios.post('/user/add', {
        first_name: this.form.first_name,
        surname: this.form.surname,
        last_name: this.form.last_name,
        email: this.form.email,
        mobile: this.form.mobile,
        role: this.form.role,
        location: this.form.location,
        gender: this.form.gender,
        birthday: this.form.birthday
      })
          .then(response => {
            this.$root.vtoast.show({message: response.data.message});
          })
          .catch(error => {
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'});
          });
    },

    askDeleteUser(id) {
      this.dialog_delete_user = true;
      this.selected_user = id;
    },

    deleteUser() {
      axios.delete('/user/delete/' + this.selected_user)
          .then(response => {
            this.fetchData();
            this.dialog_delete_user = false;
            this.$root.vtoast.show({message: response.data.message})
          })
          .catch(error => {
            this.dialog_delete_user = false;
            this.dialog_delete_user = false;
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'});
          })
    }
  }
}
</script>

<style scoped>
.v-table >>> th {
  font-size: 0.8rem !important;
  background-color: #fafafa !important;
}
</style>