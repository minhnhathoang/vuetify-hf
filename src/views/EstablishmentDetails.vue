<template>
  <v-container class="ma-0">
    <div class="v-col-12">
      <v-card v-if="establishment" class="v-col-12 v-col-md-10 v-col-lg-9">

        <v-card-header>
          <v-card-title>
            Establishment details
          </v-card-title>
          <v-spacer>
          </v-spacer>
          <v-btn :to="{name: 'FormEditEstablishment', params: {id: this.id}}" color="primary" icon="mdi-pencil">Edit
          </v-btn>
        </v-card-header>

        <v-card-text>
          <v-table>
            <thead>
            </thead>
            <tbody>
            <tr>
              <td class="font-weight-bold text-no-wrap">Name of food establishment</td>
              <td class="text-uppercase font-weight-bold text-accent">{{ establishment.name }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold text-no-wrap">Owner</td>
              <td>{{ establishment.owner }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold text-no-wrap">Address</td>
              <td>{{ establishment.address }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold text-no-wrap">Kind of bussiness</td>
              <td>{{ establishment.kind_of_business }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">Telephone</td>
              <td>{{ establishment.telephone }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold">Fax</td>
              <td>{{ establishment.fax }}</td>
            </tr>

            <tr>
              <td class="font-weight-bold">Description</td>
              <td>{{ establishment.description }}</td>
            </tr>

            </tbody>
          </v-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-header>
          <v-card-title v-if="establishment.certificate" class="text-error">
            Certificate
            <v-chip v-if="establishment.certificate.is_revoked" class="font-weight-bold text-error ml-3" size="small">
              Revoked
            </v-chip>

            <v-chip v-else-if="establishment.certificate.is_expired === true" class="font-weight-bold text-secondary ml-3"
                    size="small">
              Expired
            </v-chip>

            <v-chip v-else class="font-weight-bold text-success ml-3" size="small">
              Active
            </v-chip>
          </v-card-title>

          <div v-else class="d-flex">
            <v-card-title class="text-error">
              Certificate:
            </v-card-title>
            <div class="mx-3 font-italic align-self-center">(No Certificate Yet)</div>
          </div>
        </v-card-header>


        <v-card-text v-if="establishment.certificate">
          <div class="font-weight-medium"> Registration Number:
            <strong class="text-accent text-h6 font-weight-bold">
              #{{ establishment.certificate.registration_number }}</strong>
          </div>
          <div class="font-weight-medium mt-3"> Date issued:
            <strong class="font-weight-bold"> {{ establishment.certificate.date_issued }}</strong>
          </div>
          <div class="font-weight-medium mt-3"> Valid until:
            <strong class="font-weight-bold"> {{ establishment.certificate.due_date }}
              <span
                  class="text-no-wrap font-italic text-medium-emphasis">({{
                  establishment.certificate.time_remaining
                }})</span>
            </strong>
          </div>
        </v-card-text>

        <!--        Update Certificate-->
        <div class="d-flex">
          <v-card-text class="d-flex">

            <div v-if="establishment.certificate == null">

              <v-dialog
                  v-model="dialog"
                  class="my-sm-16 my-0"
                  fullscreen
                  max-height="600"
                  max-width="900"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                      v-bind="props"
                      color="primary"
                      size="small"
                  >
                    <v-icon>mdi-file-outline</v-icon>
                    Add new
                  </v-btn>

                </template>
                <v-card class="border-sm rounded-lg align-self-center">
                  <v-card-text class="d-flex">
                    <v-toolbar-title class="font-weight-medium">Certificate</v-toolbar-title>
                    <v-btn flat icon="mdi-close" @click="dialog = !dialog">Close</v-btn>
                  </v-card-text>

                  <v-card-text>
                    <div class="d-block d-sm-flex">
                      <div class="font-weight-bold text-no-wrap align-self-baseline">TÊN CƠ SỞ
                        <span
                            class="font-italic font-weight-medium align-self-baseline">(Name of food establishment):</span>
                      </div>
                      <span class="mx-3 font-weight-bold text-accent">{{ establishment.name }}</span>
                    </div>
                    <div class="d-block d-sm-flex mt-3">
                      <div class="font-weight-bold text-no-wrap align-self-baseline">CHỦ CƠ SỞ
                        <span class="font-italic font-weight-medium align-self-baseline">(Owner):</span>
                      </div>
                      <td class="mx-3">{{ establishment.owner }}</td>
                    </div>
                    <div class="d-block d-sm-flex mt-3">
                      <div class="font-weight-bold text-no-wrap align-self-baseline">ĐỊA CHỈ
                        <span class="font-italic font-weight-medium align-self-baseline">(Address):</span>
                      </div>
                      <div class="mx-3">{{ establishment.address }}</div>
                    </div>
                    <div class="d-block d-sm-flex mt-3">
                      <div class="font-weight-bold text-no-wrap align-self-baseline">LOẠI HÌNH KINH DOANH
                        <span class="font-italic font-weight-medium align-self-baseline">(Kind of business):</span>
                      </div>
                      <div class="mx-3">{{ establishment.kind_of_business }}</div>
                    </div>
                    <div class="d-block d-sm-flex mt-3">
                      <div class="font-weight-bold text-no-wrap align-self-baseline">ĐIỆN THOẠI
                        <span class="font-italic font-weight-medium align-self-baseline">(Tel.):</span>
                      </div>
                      <div class="mx-3">{{ establishment.telephone }}</div>

                    </div>

                    <div class="d-block d-sm-flex mt-3">
                      <v-text-field v-model="certificate.date_issued" class="mr-sm-3" color="primary" density="compact"
                                    prefix="Ngày cấp (Date issued)"
                                    type="date"
                                    variant="outlined"
                      ></v-text-field>
                      <v-text-field v-model="certificate.due_date" color="primary" density="compact" prefix="Có hiệu lực (Valid until)"
                                    type="date"
                                    variant="outlined"></v-text-field>
                    </div>
                  </v-card-text>

                  <v-card-text>
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="dialog1"
                        :loading="dialog1"
                        class="bg-primary text-white"
                        @click="addNewCertificate"
                    >
                      Submit
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
            </div>

            <div v-if="establishment.certificate && establishment.certificate.is_expired === false">
              <div v-if="establishment.certificate && establishment.certificate.is_revoked === 0" class="ml-3">
                <v-btn
                    v-bind="props"
                    color="error"
                    flat=""
                    size="small"
                    variant="outlined"
                    @click="revoke"
                >
                  Revoke
                </v-btn>
              </div>

              <div v-if="establishment.certificate && establishment.certificate.is_revoked === 1" class="ml-3">
                <v-btn
                    v-bind="props"
                    color="error"
                    flat=""
                    size="small"
                    variant="outlined"
                    @click="unrevoke"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                  Unrevoke
                </v-btn>
              </div>
            </div>

            <div v-if="establishment.certificate" class="ml-3">
              <v-btn
                  v-bind="props"
                  color=""
                  flat=""
                  size="small"
                  variant="outlined"
                  @click="deleteCertificate"
              >
                <v-icon>mdi-trash-can-outline</v-icon>
                Delete
              </v-btn>
            </div>
          </v-card-text>

        </div>
        <!--        -->

      </v-card>
    </div>

  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      establishment: null,
      certificate: {
        date_issued: new Date(),
        due_date: new Date(),
        is_revoke: 0,
      },
      dialog: false,
      dialog1: false,
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
    },

    addNewCertificate() {
      axios.post('/certificate/add', {
        establishment_id: this.establishment.id,
        date_issued: this.certificate.date_issued,
        due_date: this.certificate.due_date
      })
          .then(response => {
            this.$root.vtoast.show({message: response.data.message});
            this.getEstablishmentDetails();
          })
          .catch(error => {
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'});
          });
    },
    revoke() {
      axios.post('/certificate/update', {
        establishment_id: this.establishment.id,
        is_revoked: 1
      })
          .then(response => {
            this.$root.vtoast.show({message: response.data.message});
            this.getEstablishmentDetails();
          })
          .catch(error => {
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'});
          });
    },
    unrevoke() {
      axios.post('/certificate/update', {
        establishment_id: this.establishment.id,
        is_revoked: 0
      })
          .then(response => {
            this.$root.vtoast.show({message: response.data.message});
            this.getEstablishmentDetails();
          })
          .catch(error => {
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'});
          });
    },
    deleteCertificate() {
      axios.delete('/certificate/delete/' + this.establishment.id)
          .then(response => {
            this.$root.vtoast.show({message: response.data.message});
            this.getEstablishmentDetails();
          })
          .catch(error => {
            this.$root.vtoast.show({message: error.response.data.message, color: 'error'});
          });
    },
  }
}
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>