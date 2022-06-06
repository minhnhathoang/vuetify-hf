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
    <v-card class="v-col-12 v-col-md-10 v-col-lg-9">
      <v-card-title>
        Create new plan
      </v-card-title>
        <v-card-text>
          <DatePicker
              v-model="range"
              mode="dateTime"
              :masks="masks"
              is-range
          >
            <template v-slot="{ inputValue, inputEvents, isDragging }">
              <div class="v-col-10 v-col-md-5 v-col-lg-5 v-col-sm-5">
                <v-text-field
                    variant="outlined"
                    density="compact"
                    label="Start"
                    v-model="inputValue.start"
                    :class="isDragging ? 'text-secondary' : 'text-primary'"
                    :value="inputValue.start"
                    v-on="inputEvents.start"
                />

                <v-text-field
                    width="50px"
                    variant="outlined"
                    density="compact"
                    label="End"
                    v-model="inputValue.end"
                    :class="isDragging ? 'text-secondary' : 'text-primary'"
                    :value="inputValue.end"
                    v-on="inputEvents.end"
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

