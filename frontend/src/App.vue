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
              @click="openModal"
              text
      >
        <span class="mr-2">Profile</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-dialog v-model="modal" persistent max-width="600px">
        <UserProfile/>
      </v-dialog>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  // import axios from 'axios'
  import UserProfile from "./components/UserProfile";
export default {
  name: 'App',

  components: {
    UserProfile
  },
  data: () => ({
    isLogin: false,
    userEmail: ''
  }),
  methods: {
    openModal() {
      this.modal = !this.modal
    }
  },
  computed: {
    modal: {
      get: function() {
        return this.$store.getters.modal
      },
      set: function() {
        return !this.$store.dispatch('setModal', true)
      }
    }
  },
  mounted() {
    if(sessionStorage.getItem('token') !== null){
      this.isLogin = true
      this.userEmail = sessionStorage.getItem('user-email')
    }
    // axios
    //         .get('http://localhost:5000/api/v1/projects', {
    //           params: {
    //             user_id: 1
    //           }
    //         })
    //         .then(res => {console.log('all', res)})
    // axios
    //         .post('http://localhost:5000/api/v1/projects', {
    //           project: {
    //             title: "asd",
    //             user_id: 2
    //           }
    //         })
    //         .then(res => {console.log('new', res)})

  }
};
</script>
