<template>
  <v-container fluid>
    <calendar
        :attributes="attributes"
        :masks="masks"
        class="custom-calendar"
    >
      <template v-slot:day-content="{ day, attributes }">
        <div>
          <div class="font-weight-bold text-primary ma-3">{{ day.day }}</div>
          <div class="">
            <p
                v-for="attr in attributes"
                :key="attr.key"
                :class="attr.customData.class"
                class="rounded-lg p-1 mt-0 mb-1 mx-1 px-2"
            >
              {{ attr.customData.title }}
            </p>
          </div>
        </div>
      </template>
    </calendar>
  </v-container>
</template>

<script>
import {Calendar} from "v-calendar";
import SideBar from "@/components/SideBar";
import AddUser from "@/views/FormAddUser";

export default {
  components: {
    AddUser,
    SideBar,
    Calendar
  },
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      masks: {
        weekdays: 'WWW',
      },
      attributes: [
        {
          key: 1,
          customData: {
            title: 'Lunch with mom.',
            class: 'bg-info',
          },
          dates: {start: new Date(year, month, 1), end: new Date(year, month, 6)}
        },
        {
          key: 2,
          customData: {
            title: 'Take Noah to basketball practice',
            class: 'bg-primary',
          },
          dates: new Date(year, month, 2),
        },
        {
          key: 3,
          customData: {
            title: "Noah's basketball game.",
            class: 'bg-primary',
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: 'Take car to the shop',
            class: 'bg-primary',
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: 'Meeting with new client.',
            class: 'bg-primary',
          },
          dates: new Date(year, month, 7),
        },
        {
          key: 5,
          customData: {
            title: "Mia's gymnastics practice.",
            class: 'bg-primary',
          },
          dates: new Date(year, month, 11),
        },
        {
          key: 6,
          customData: {
            title: 'Cookout with friends.',
            class: 'bg-orange-500 text-white',
          },
          dates: {months: 5, ordinalWeekdays: {2: 1}},
        },
        {
          key: 7,
          customData: {
            title: "Mia's gymnastics recital.",
            class: 'bg-pink-500 text-white',
          },
          dates: new Date(year, month, 22),
        },
        {
          key: 8,
          customData: {
            title: 'Visit great grandma.',
          },
          dates: new Date(year, month, 25),
        },
      ],
    };
  },
};
</script>

<style lang="scss">
$day-border: 1px solid #b8c2cc;
$day-border-highlight: 1px solid #b8c2cc;
$day-width: 90px;
$day-height: 90px;
$weekday-bg: #f8fafc;
$weekday-border: 0px solid #eaeaea;

.custom-calendar.vc-container {
  //border: 1px solid #b8c2cc;
  //border-highlight: 2px solid #b8c2cc;
  //width: 90px;
  border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;

  .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }

  .vc-weeks {
    padding: 10px;
  }

  .vc-weekday {
    background-color: $weekday-bg;
    border-bottom: $weekday-border;
    border-top: $weekday-border;
    padding: 5px 5px;
  }

  .vc-day {
    padding: 3px 5px 3px 5px;
    text-align: left;
    min-height: $day-height;
    min-width: $day-width;
    overflow: auto;
    background-color: white;

    &:not(.on-bottom) {
      border-bottom: $day-border;

      &.weekday-1 {
        border-bottom: $day-border-highlight;
      }
    }

    &:not(.on-right) {
      border-right: $day-border;
    }
  }

  .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>
