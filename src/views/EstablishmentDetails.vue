<template>
  <v-container class="ma-0">
    <div class="v-col-12">
      <v-card v-if="establishment" class="v-col-12 v-col-md-10 v-col-lg-9">

        <v-card-header>
          <v-card-title>
            Establishment details
          </v-card-title>
        </v-card-header>

        <v-card-text>
          <v-table density="compact">
            <thead>
            </thead>
            <tbody>
            <tr>
              <td class="font-weight-bold text-no-wrap">Name of food establishment</td>
              <td class="text-uppercase font-weight-bold text-accent">{{ establishment.name }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold text-no-wrap">Owner </td>
              <td>{{establishment.owner}}</td>
            </tr>
            <tr>
              <td class="font-weight-bold text-no-wrap">Address</td>
              <td>{{establishment.address}}</td>
            </tr>
            <tr>
              <td class="font-weight-bold text-no-wrap">Kind of bussiness</td>
              <td>{{establishment.kind_of_business}}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">Telephone</td>
              <td>{{establishment.telephone}}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">Fax</td>
              <td>{{establishment.tax}}</td>
            </tr>

            <tr>
              <td class="font-weight-bold">Description</td>
              <td>{{establishment.description}}</td>
            </tr>

            </tbody>
          </v-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-header>
          <v-card-title class="text-error" v-if="establishment.certificate">
            Certificate
            <v-chip size="small" v-if="establishment.certificate.is_revoked" class="font-weight-bold text-error ml-3">
              Revoked
            </v-chip>

            <v-chip size="small" v-else-if="establishment.certificate.is_expired === true" class="font-weight-bold text-secondary ml-3">
              Expired
            </v-chip>

            <v-chip size="small" v-else class="font-weight-bold text-success ml-3">
              Active
            </v-chip>
          </v-card-title>

          <div v-else class="d-flex">
            <v-card-title class="text-error">
              Certificate:
            </v-card-title>
            <div class="text-secondary mx-3 font-italic align-self-center">(No Certificate Yet)</div>
          </div>
        </v-card-header>

        <v-card-text v-if="establishment.certificate">
          <div class="font-weight-medium"> Registration Number:
            <strong class="text-accent text-h6 font-weight-bold"> #{{establishment.certificate.registration_number}}</strong>
          </div>
          <div class="font-weight-medium mt-3"> Date issued:
            <strong class="font-weight-bold"> {{establishment.certificate.date_issued}}</strong>
          </div>
          <div class="font-weight-medium mt-3"> Due Date:
            <strong class="font-weight-bold"> {{establishment.certificate.due_date}}
              <span class="text-no-wrap font-italic text-medium-emphasis">({{establishment.certificate.time_remaining}})</span>
            </strong>
          </div>
        </v-card-text>
      </v-card>
    </div>


<!--    <v-dialog-->
<!--        v-model="dialog"-->
<!--        fullscreen-->
<!--        transition="dialog-bottom-transition"-->
<!--    >-->
<!--      <template v-slot:activator="{ props }">-->
<!--        <v-btn-->
<!--            color="primary"-->
<!--            dark-->
<!--            v-bind="props"-->
<!--        >-->
<!--          Open Dialog-->
<!--        </v-btn>-->

<!--      </template>-->

<!--      <v-container>-->
<!--        <v-card>-->
<!--          <v-toolbar-->
<!--              dark-->
<!--              color="primary"-->
<!--          >-->
<!--            <v-btn-->
<!--                icon-->
<!--                dark-->
<!--                @click="dialog = false"-->
<!--            >-->
<!--              <v-icon>mdi-close</v-icon>-->
<!--            </v-btn>-->
<!--            <v-toolbar-title>Settings</v-toolbar-title>-->
<!--            <v-spacer></v-spacer>-->
<!--            <v-toolbar-items>-->
<!--              <v-btn-->
<!--                  dark-->
<!--                  text-->
<!--                  @click="dialog = false"-->
<!--              >-->
<!--                Save-->
<!--              </v-btn>-->
<!--            </v-toolbar-items>-->
<!--          </v-toolbar>-->


<!--          <v-card>-->


<!--            <v-card-text>-->
<!--              <v-table >-->
<!--                <thead>-->
<!--                </thead>-->
<!--                <tbody>-->
<!--                <tr>-->
<!--                  <td class="font-weight-bold">Name of food establishment:</td>-->
<!--                  <td class="text-uppercase font-weight-bold">Công ty TNHH ABC</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td class="font-weight-bold">Owner </td>-->
<!--                  <td>Hoang Minh Nhat</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td class="font-weight-bold">Address</td>-->
<!--                  <td>Address San Diego County, CA 91905</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td class="font-weight-bold">Kind of bussiness</td>-->
<!--                  <td>Address San Diego County, CA 91905</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td class="font-weight-bold">Telephone</td>-->
<!--                  <td>12345678910</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td class="font-weight-bold">Fax</td>-->
<!--                  <td></td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td class="font-weight-bold">Date Issued</td>-->
<!--                  <td class="font-weight-bold text-success">#324324</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <td class="font-weight-bold">Due Date</td>-->
<!--                  <td class="font-weight-bold text-error">#324324</td>-->
<!--                </tr>-->
<!--                </tbody>-->
<!--              </v-table>-->
<!--            </v-card-text>-->



<!--          </v-card>-->

<!--        </v-card>-->

<!--      </v-container>-->
<!--    </v-dialog>-->
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      id: this.$route.params.id,
      establishment: null
    }
  },
  created() {
    this.getEstablishmentDetails();
  },
  methods: {
    getEstablishmentDetails() {
      axios.get('/establishment/details/' + this.id)
          .then(response => {
            this.establishment = response.data.establishment;
          })
          .catch(error => {

          })
    }
  }
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>