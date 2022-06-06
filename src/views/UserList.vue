<template>
  <v-container fluid>
    <v-dialog
        v-model="dialog"
        fullscreen
        max-width="600"
        class="my-sm-10 my-0"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            color="primary"
            v-bind="props"
        >
          Add new user
        </v-btn>
      </template>
      <v-card class="border-sm rounded-lg align-self-center">
        <v-card-text class="d-flex">
          <v-toolbar-title class="font-weight-medium">Add user</v-toolbar-title>
          <v-btn flat @click="dialog = !dialog" icon="mdi-close">Close</v-btn>
        </v-card-text>

        <v-card-text>
          <div class="align-content-space-between d-sm-flex">
            <v-text-field
                v-model="form.first_name"
                type="text"
                label="First Name"
                variant="outlined"
                color="primary"
                density="compact"/>
            <v-text-field
                v-model="form.surname"
                type="text"
                label="Surname"
                variant="outlined"
                class="mx-sm-3"
                color="primary"
                density="compact"/>
            <v-text-field
                v-model="form.last_name"
                type="text"
                label="Last Name"
                variant="outlined"
                color="primary"
                density="compact"/>
          </div>
          <v-text-field
              v-model="form.email"
              type="email"
              label="Email" append-inner-icon="mdi-email"
              placeholder="john@example.com"
              variant="outlined"
              color="primary"
              density="compact"/>

          <v-text-field
              v-model="form.mobile"
              type="number"
              label="Mobile" append-inner-icon="mdi-phone"
              variant="outlined"
              color="primary"
              density="compact"/>

          <div class="d-flex mb-5">
            <div class="align-self-center text-medium-emphasis"> Birthday</div>
            <DatePicker v-model="form.date" mode="date" is24hr>
              <template v-slot="{ inputValue, inputEvents }">
                <input
                    class="mx-3 px-2 py-1 border rounded-lg"
                    :value="inputValue"
                    v-on="inputEvents"
                />
              </template>
            </DatePicker>
            <v-radio-group v-model="form.gender" inline class="d-flex">
              <v-radio value="0" color="primary">
                <template v-slot:label class="">
                  Male
                </template>
              </v-radio>
              <v-radio value="1" color="primary">
                <template v-slot:label>
                  Female
                </template>
              </v-radio>
            </v-radio-group>
          </div>

          <v-snackbar
              v-model="snackbar"
              timeout="5000"
              location="center"
              color="error"
          >
            <div v-for="(i, k) in errors">
              {{ i[0] }}
            </div>
            <template v-slot:actions>
              <v-btn
                  @click="snackbar = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>


          <v-radio-group v-model="form.role" inline>
            <template v-slot:label>
              <div class="mb-4"><strong>Choose a user role</strong></div>
            </template>
            <v-radio value="0" color="primary">
              <template v-slot:label>
                Admin
              </template>
            </v-radio>
            <v-radio value="1" color="primary">
              <template v-slot:label>
                User
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
                color="primary"
                indeterminate
                :size="50"
            ></v-progress-circular>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>

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
    <!--///////////-->

    <v-card-text>
      <v-table fixed-header>
        <thead class="text-uppercase text-primary">
        <tr>
          <th>No</th>
          <th v-for="column in columns" scope="col" @click="updateSortColumn(column)" class="text-no-wrap">
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
          <td colspan="6" class="text-center">No Records found</td>
        </tr>
        <tr v-for="(data, index) in tableData" v-else>
          <td class="text-primary">
            <a @click="getUserDetails(data['id'])">{{ index + perPage * (page - 1) }}</a>
          </td>

          <td class=" align-center">

            <div class="d-flex align-center">
              <v-avatar size="small" v-if="data['avatar']" color="primary">
                <v-img :src="data['avatar']"></v-img>
              </v-avatar>

              <v-avatar v-else size="small" color="primary">
                {{ data['full_name'].charAt(0) }}
              </v-avatar>

              <div class="ml-2">
                <div class="font-weight-medium text-no-wrap align-self-end">{{ data['full_name'] }}</div>
                <div class="text-no-wrap text-medium-emphasis align-self-end">{{ data['email'] }}</div>
              </div>
            </div>
          </td>

          <td>
            <v-chip size="small" :color="data['role'] === 'Admin' ? 'primary' : 'warning'" class="font-weight-bold">
              {{ data['role'] }}
            </v-chip>
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
            <v-btn @click="getUserDetails(data['id'])" elevation="0" size="x-small" icon="mdi-eye-outline"
                   color="accent" variant="text">
            </v-btn>

            <v-btn @click="askDeleteUser(data['id'])" elevation="0" size="x-small" icon="mdi-trash-can-outline"
                   color="error"
                   variant="text">
            </v-btn>
          </td>
        </tr>
        </tbody>
      </v-table>
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
    columns: ['full_name', 'role', 'mobile', 'address', 'joined_on'],

    form: {
      first_name: null,
      surname: null,
      last_name: null,
      email: null,
      mobile: null,
      role: null,
      birthday: null,
      gender: null
    },
    timeout: 2000,
    errors: null,

    dialog1: false,
    dialog: false,
    dialog_delete_user: false,
    selected_user: null
  }),
  created() {
    this.fetchData();
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
      this.$store.dispatch('account/addUser', {
        first_name: this.form.first_name,
        surname: this.form.surname,
        last_name: this.form.last_name,
        email: this.form.email,
        mobile: this.form.mobile,
        role: this.form.role,
        gender: this.form.gender,
        birthday: this.form.birthday
      }).catch(error => {
        this.snackbar = true;
        this.errors = error;
      });
      this.dialog = true;
    },

    askDeleteUser(id) {
      this.dialog_delete_user = true;
      this.selected_user = id;
    },

    deleteUser() {
      axios.delete('/user/delete/' + this.selected_user)
          .then(response => {
            console.log(response);
            this.fetchData();
            this.dialog_delete_user = false;
            resolve(response);
          })
          .catch(error => {
            console.log(error);
            this.dialog_delete_user = false;
            reject(error.response.data.errors);
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