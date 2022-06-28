<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        persistent
    >
      <template v-slot:activator="{ props }">
        <v-btn
            v-bind="props"
            color="primary"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  md="4"
                  sm="6"
              >
                <v-text-field
                    label="Legal first name*"
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  md="4"
                  sm="6"
              >
                <v-text-field
                    hint="example of helper text only on focus"
                    label="Legal middle name"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  md="4"
                  sm="6"
              >
                <v-text-field
                    hint="example of persistent helper text"
                    label="Legal last name*"
                    persistent-hint
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Email*"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Password*"
                    required
                    type="password"
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-autocomplete
                    v-model="value"
                    :items="items"
                    dense
                    filled
                    label="Filled"
                ></v-autocomplete>
              </v-col>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-autocomplete
                    :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                    label="Interests"
                    multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue-darken-1"
              text
              @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="blue-darken-1"
              text
              @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: ['foo', 'bar'],
      value: null,
    }
  },
}
</script>