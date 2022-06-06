<template>
  <v-container>
    <v-card v-if="form">
      <v-card-text>
        <v-card-title>
          Edit establishment
        </v-card-title>
      </v-card-text>
      <v-card-text>
        <v-form class="multi-col-validation mt-1">
          <v-row>
            <v-col
                md="6"
                cols="12"
            >
              <v-text-field
                  v-model="form.name"
                  type="text"
                  color="primary"
                  label="Name of food establishment"
                  variant="outlined"
                  hide-details
                  density="compact"/>
            </v-col>

            <v-col
                md="6"
                cols="12"
            >
              <v-text-field
                  v-model="form.owner"
                  type="text"
                  color="primary"
                  label="Owner"
                  variant="outlined"
                  hide-details
                  density="compact"/>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-select
                  v-model="form.kind_of_business"
                  :items="['Sản xuất thực phẩm', 'Dịch vụ ăn uống']"
                  label="Kind of business"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  outlined
                  dense
                  hide-details
              ></v-select>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="form.fax"
                  type="number"
                  color="primary"
                  label="Fax"
                  variant="outlined"
                  hide-details
                  density="compact"/>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="form.telephone"
                  type="number"
                  color="primary"
                  label="Telephone"
                  variant="outlined"
                  hide-details
                  density="compact"/>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
              <v-text-field
                  v-model="form.address"
                  type="text"
                  color="primary"
                  label="Address"
                  variant="outlined"
                  hide-details
                  density="compact"/>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
              <v-select
                  v-model="form.province"
                  :items="this.$store.state.gso.provinces"
                  label="Province"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  outlined
                  dense
                  hide-details
              ></v-select>
            </v-col>

            <v-col
                cols="12"
                md="3"
            >
              <v-select
                  v-model="form.district"
                  :items="this.$store.state.gso.districts"
                  label="District"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  outlined
                  dense
                  hide-details
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
              <v-select
                  v-model="form.commune"
                  :items="this.$store.state.gso.communes"
                  label="Commune"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  outlined
                  dense
                  hide-details
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
              <v-textarea
                  v-model="form.description"
                  label="Description"
                  variant="outlined"
                  density="compact"
                  color="primary"
                  outlined
                  rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-btn @click="updateEstablishmentDetails" color="primary">
          Add new establishment
        </v-btn>
        <v-btn @click="resetForm" color="primary" variant="outlined" class="ml-3">
          Reset form
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: null,
        owner: null,
        address: null,
        kind_of_business: null,
        telephone: null,
        fax: null,
        description: null,

        province: "",
        district: "",
        commune: "",
      },
      id: this.$route.params.id
    }
  },
  created() {
    this.getEstablishmentDetails();
    this.$store.dispatch('gso/getProvinces');
  },
  watch: {
    'form.province': {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
        this.$store.state.gso.current_province = newValue;
        this.$store.dispatch('gso/getDistrictsOfProvince');
        this.form.district = null;
        this.form.commune = null;
      },
    },
    'form.district': {
      handler(newValue, oldValue) {
        this.$store.state.gso.current_district = newValue;
        this.$store.dispatch('gso/getCommunesOfDistrict');
        this.form.commune = null;
      }
    },
    deep: true,
  },
  methods: {
    getEstablishmentDetails() {
      axios.get('/establishment/details/' + this.id, )
          .then(response => {
            this.form = response.data.establishment;
          })
          .catch(error => {

          })
    },
    updateEstablishmentDetails() {
      axios.post('/establishment/edit/' + this.id, {
        name: this.form.name,
        owner: this.form.owner,
        kind_of_business: this.form.kind_of_business,
        telephone: this.form.telephone,
        fax: this.form.fax,
        address: this.form.address,
        province: this.form.province,
        district: this.form.district,
        commune: this.form.commune,
        description: this.form.description,
      })
          .then(response => {
            this.$root.vtoast.show({message: response.data.message})
          })
          .catch(error => {
            console.log(error);
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'})
          })
    },
    resetForm() {
      this.getEstablishmentDetails();
    }
  }
}
</script>
