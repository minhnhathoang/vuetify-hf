<template>

  {{this.establishment}}

<!--  <v-card>-->


<!--    <v-card-text>-->
<!--      <v-table >-->
<!--        <thead>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        <tr>-->
<!--          <td class="font-weight-bold">Name of food establishment:</td>-->
<!--          <td class="text-uppercase font-weight-bold">Công ty TNHH ABC</td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="font-weight-bold">Owner </td>-->
<!--          <td>Hoang Minh Nhat</td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="font-weight-bold">Address</td>-->
<!--          <td>Address San Diego County, CA 91905</td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="font-weight-bold">Kind of bussiness</td>-->
<!--          <td>Address San Diego County, CA 91905</td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="font-weight-bold">Telephone</td>-->
<!--          <td>12345678910</td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="font-weight-bold">Fax</td>-->
<!--          <td></td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="font-weight-bold">Date Issued</td>-->
<!--          <td class="font-weight-bold text-success">#324324</td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <td class="font-weight-bold">Due Date</td>-->
<!--          <td class="font-weight-bold text-error">#324324</td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </v-table>-->
<!--    </v-card-text>-->



<!--  </v-card>-->

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

<!--     <v-container>-->
<!--       <v-card>-->
<!--         <v-toolbar-->
<!--             dark-->
<!--             color="primary"-->
<!--         >-->
<!--           <v-btn-->
<!--               icon-->
<!--               dark-->
<!--               @click="dialog = false"-->
<!--           >-->
<!--             <v-icon>mdi-close</v-icon>-->
<!--           </v-btn>-->
<!--           <v-toolbar-title>Settings</v-toolbar-title>-->
<!--           <v-spacer></v-spacer>-->
<!--           <v-toolbar-items>-->
<!--             <v-btn-->
<!--                 dark-->
<!--                 text-->
<!--                 @click="dialog = false"-->
<!--             >-->
<!--               Save-->
<!--             </v-btn>-->
<!--           </v-toolbar-items>-->
<!--         </v-toolbar>-->


<!--         <v-card>-->

<!--     -->
<!--           <v-card-text>-->
<!--             <v-table >-->
<!--               <thead>-->
<!--               </thead>-->
<!--               <tbody>-->
<!--               <tr>-->
<!--                 <td class="font-weight-bold">Name of food establishment:</td>-->
<!--                 <td class="text-uppercase font-weight-bold">Công ty TNHH ABC</td>-->
<!--               </tr>-->
<!--               <tr>-->
<!--                 <td class="font-weight-bold">Owner </td>-->
<!--                 <td>Hoang Minh Nhat</td>-->
<!--               </tr>-->
<!--               <tr>-->
<!--                 <td class="font-weight-bold">Address</td>-->
<!--                 <td>Address San Diego County, CA 91905</td>-->
<!--               </tr>-->
<!--               <tr>-->
<!--                 <td class="font-weight-bold">Kind of bussiness</td>-->
<!--                 <td>Address San Diego County, CA 91905</td>-->
<!--               </tr>-->
<!--               <tr>-->
<!--                 <td class="font-weight-bold">Telephone</td>-->
<!--                 <td>12345678910</td>-->
<!--               </tr>-->
<!--               <tr>-->
<!--                 <td class="font-weight-bold">Fax</td>-->
<!--                 <td></td>-->
<!--               </tr>-->
<!--               <tr>-->
<!--                 <td class="font-weight-bold">Date Issued</td>-->
<!--                 <td class="font-weight-bold text-success">#324324</td>-->
<!--               </tr>-->
<!--               <tr>-->
<!--                 <td class="font-weight-bold">Due Date</td>-->
<!--                 <td class="font-weight-bold text-error">#324324</td>-->
<!--               </tr>-->
<!--               </tbody>-->
<!--             </v-table>-->
<!--           </v-card-text>-->



<!--         </v-card>-->

<!--       </v-card>-->

<!--     </v-container>-->
<!--    </v-dialog>-->
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
            this.establishment = response.data;
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