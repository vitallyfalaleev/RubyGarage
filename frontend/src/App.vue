<template>
  <v-app>
    <v-app-bar
            app
            color="primary darken-2"
            dark
            dense
    >
      <div class="d-flex align-center">
        <v-toolbar-title class="text-uppercase font-weight-black">TodoList</v-toolbar-title>
        <v-subheader>for RubyGarage</v-subheader>
      </div>

      <v-spacer></v-spacer>

      <v-btn
              @click="modal = !modal"
              text
      >
        <span class="mr-2">Registration</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-dialog v-model="modal" max-width="600px">
        <UserProfile/>
        <v-card>
          <v-card-title>Edit profile</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="">
              <v-text-field
                      label="E-mail"
                      required
              ></v-text-field>
              <v-text-field
                      label="Password"
                      type="password"
                      required
              ></v-text-field>
              <v-btn
                      color="success"
                      medium
                      type="submit" >submit</v-btn>
              <v-btn color="red darken-1" text @click="modal = false">Close</v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import UserProfile from "./components/UserProfile";
export default {
  name: 'App',

  components: {
    UserProfile
  },

  data: () => ({
    modal: true,
  }),
  mounted() {
    axios
            .post('http://localhost:5000/api/v1/login', {
                      "user": {
                        "email": "b@c.c",
                        "password": "111111"
                      }
                    }
            )
            .then(response => (console.log("1", response)));
    axios
            .get('http://localhost:5000/api/v1/users')
            .then(response => (console.log("2", response)));
  }
};
</script>
