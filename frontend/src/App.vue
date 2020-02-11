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
        text
      >
        <span class="mr-2">Registration</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
