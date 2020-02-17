<template>
  <div class="home">
    <v-container>
      <project-list/>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectList from "../components/ProjectList";

export default {

  name: 'Home',
  components: {
    ProjectList
  },
  computed: {
  },
}
</script>
