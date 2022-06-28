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
                cols="12"
                md="6"
            >
              <v-text-field
                  v-model="form.name"
                  color="primary"
                  density="compact"
                  hide-details
                  label="Name of food establishment"
                  type="text"
                  variant="outlined"/>
            </v-col>

            <v-col
                cols="12"
                md="6"
            >
              <v-text-field
                  v-model="form.owner"
                  color="primary"
                  density="compact"
                  hide-details
                  label="Owner"
                  type="text"
                  variant="outlined"/>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-select
                  v-model="form.kind_of_business"
                  :items="['Sản xuất thực phẩm', 'Dịch vụ ăn uống']"
                  color="primary"
                  dense
                  density="compact"
                  hide-details
                  label="Kind of business"
                  outlined
                  variant="outlined"
              ></v-select>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="form.fax"
                  color="primary"
                  density="compact"
                  hide-details
                  label="Fax"
                  type="number"
                  variant="outlined"/>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="form.telephone"
                  color="primary"
                  density="compact"
                  hide-details
                  label="Telephone"
                  type="number"
                  variant="outlined"/>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
              <v-text-field
                  v-model="form.address"
                  color="primary"
                  density="compact"
                  hide-details
                  label="Address"
                  type="text"
                  variant="outlined"/>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
              <v-select
                  v-model="form.province"
                  :items="this.$store.state.gso.provinces"
                  color="primary"
                  dense
                  density="compact"
                  hide-details
                  label="Province"
                  outlined
                  variant="outlined"
              ></v-select>
            </v-col>

            <v-col
                cols="12"
                md="3"
            >
              <v-select
                  v-model="form.district"
                  :items="this.$store.state.gso.districts"
                  color="primary"
                  dense
                  density="compact"
                  hide-details
                  label="District"
                  outlined
                  variant="outlined"
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
              <v-select
                  v-model="form.commune"
                  :items="this.$store.state.gso.communes"
                  color="primary"
                  dense
                  density="compact"
                  hide-details
                  label="Commune"
                  outlined
                  variant="outlined"
              ></v-select>
            </v-col>
            <v-col
                cols="12"
                md="6"
            >
              <v-textarea
                  v-model="form.description"
                  color="primary"
                  density="compact"
                  label="Description"
                  outlined
                  rows="3"
                  variant="outlined"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-text>
        <v-btn color="primary" @click="updateEstablishmentDetails">
          Add new establishment
        </v-btn>
        <v-btn class="ml-3" color="primary" variant="outlined" @click="resetForm">
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
      axios.get('/establishment/details/' + this.id,)
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
