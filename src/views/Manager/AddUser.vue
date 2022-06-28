<template>
  <v-card max-width="400">
    <v-card-header class="justify-center">
      <h3 class="text-primary">
        Admin
      </h3>
    </v-card-header>
    <v-divider></v-divider>

    <div class="">
      <v-card-text>
        <v-avatar
            rounded="0"
            size="100%"
        >
          <v-img
              src="https://scontent.fhan14-2.fna.fbcdn.net/v/t1.15752-9/282317469_602029377505447_4340180129650370326_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_ohc=GAro2coeuNIAX_y4U7Z&_nc_ht=scontent.fhan14-2.fna&oh=03_AVLo4faw3cPEnW7peOYc1cOYGkQDIhfKFWnBUl9JSD5Sfg&oe=62B2D4E4"></v-img>
        </v-avatar>
      </v-card-text>
    </div>

    <v-card-text>
      <v-divider></v-divider>
      <v-table density="compact">
        <thead>
        </thead>
        <tbody>
        <tr
            v-for="[key, value] in info"
            :key="key"
        >
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>


    <v-card-actions>
      <v-btn
          color="primary"
      >
        Normal Button
      </v-btn>
    </v-card-actions>
  </v-card>

  <!--  ////-->
  <v-card>
    <v-toolbar

        color="primary"
    >
      <v-toolbar-title>Add user</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <div class="align-content-space-between d-sm-flex">
        <v-text-field
            v-model="first_name"
            color="primary"
            density="compact"
            label="First Name"
            type="text"
            variant="outlined"/>
        <v-text-field
            v-model="surname"
            class="mx-sm-3"
            color="primary"
            density="compact"
            label="Surname"
            type="text"
            variant="outlined"/>
        <v-text-field
            v-model="last_name"
            color="primary"
            density="compact"
            label="Last Name"
            type="text"
            variant="outlined"/>
      </div>
      <v-text-field
          v-model="email"
          append-inner-icon="mdi-email"
          color="primary" density="compact"
          label="Email"
          placeholder="john@example.com"
          type="email"
          variant="outlined"/>

      <v-select
          :items="roles"
          color="primary"
          density="compact"
          label="Role"
          multiple
          variant="outlined"
      ></v-select>

      <v-divider class="my-2"></v-divider>

    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
          color="success"
          depressed
      >
        Post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      info: [
        ["Name", "Hoang Minh Nhat"],
        ["Emai", "minhatlop5b@gmail.com"],
        ["Age", "20"],
        ["Location", "Hai Duong"],
        ["Gender", "Male"]

      ],
      roles: ['Manager', 'Specialist']

    }
  },
}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: rgba(192, 0, 250, 0.986);
}
</style>