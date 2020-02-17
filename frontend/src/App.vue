<template>
  <v-app>
    <v-app-bar
            app
            color="primary darken-2"
            dense
    >
      <div class="d-flex align-center">
        <v-toolbar-title class="text-uppercase font-weight-black">TodoList</v-toolbar-title>
        <v-subheader>for RubyGarage</v-subheader>
      </div>

      <v-spacer></v-spacer>

      <v-btn
              @click="openModal()"
              text
      >
        <span class="mr-2">Profile {{userEmail}}</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-dialog v-model="modal" persistent max-width="600px">
        <UserProfile/>
      </v-dialog>
      <router-view v-if="isLogin"/>
      <v-container v-else>
        <v-card color="error">
          <v-card-title>You need to Singin or Login.</v-card-title>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import UserProfile from "./components/UserProfile";
export default {
  name: 'App',

  components: {
    UserProfile
  },
  data: () => ({
    userEmail: ''
  }),
  methods: {
    openModal() {
      this.$store.dispatch('setModal')
    }
  },
  computed: {
    modal() {
      return this.$store.getters.modal
    },
    isLogin() {
      return this.$store.getters.isLogin
    }
  },
};
</script>
