<template>
  <!--  <DatePicker class="inline-block h-full" v-model="date">-->
  <!--    <template v-slot="{ inputValue, togglePopover }">-->
  <!--      <div class="flex items-center">-->
  <!--        <v-btn-->
  <!--            prepend-icon="mdi-calendar-month-outline"-->
  <!--            @click="togglePopover()"-->
  <!--        >-->
  <!--        </v-btn>-->

  <!--        <v-text-field-->
  <!--            density="compact"-->
  <!--            variant="outlined"-->
  <!--            @click="togglePopover()"-->
  <!--        > {{inputValue}} </v-text-field>-->

  <!--      </div>-->
  <!--    </template>-->
  <!--  </DatePicker>-->

  <v-container>
    <div>
      <div class="text-subtitle-2 mb-2">With markup</div>

      <v-expansion-panels>
        <v-expansion-panel
            v-for="i in 3"
            :key="i"
        >
          <v-expansion-panel-title>
            Item
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <div class="text-subtitle-2 mt-4 mb-2">With props</div>

      <v-expansion-panels>
        <v-expansion-panel
            v-for="i in 3"
            :key="i"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            title="Item"
        ></v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-card class="v-col-12 v-col-md-10 v-col-lg-9">
      <v-card-title>
        Create new plan
      </v-card-title>
      <v-card-text>
        <DatePicker
            v-model="range"
            :masks="masks"
            is-range
            mode="dateTime"
        >
          <template v-slot="{ inputValue, inputEvents, isDragging }">
            <div class="v-col-10 v-col-md-5 v-col-lg-5 v-col-sm-5">
              <v-text-field
                  v-model="inputValue.start"
                  v-on="inputEvents.start"
                  :class="isDragging ? 'text-secondary' : 'text-primary'"
                  :value="inputValue.start"
                  density="compact"
                  label="Start"
                  variant="outlined"
              />

              <v-text-field
                  v-model="inputValue.end"
                  v-on="inputEvents.end"
                  :class="isDragging ? 'text-secondary' : 'text-primary'"
                  :value="inputValue.end"
                  density="compact"
                  label="End"
                  variant="outlined"
                  width="50px"
              />
            </div>
          </template>
        </DatePicker>
      </v-card-text>
    </v-card>
  </v-container>

</template>


<script>
import {DatePicker} from "v-calendar";

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      date: new Date(),
      range: {
        start: new Date(2020, 0, 6),
        end: new Date(2020, 0, 23),
      },
      masks: {
        input: 'YYYY-MM-DD h:mm A',
      },
    };
  },
};

</script>

<style scoped>

</style>

