<template>
  <div class="home">
    <v-container>
      <create-project/>
      <project-list/>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateProject from "../components/CreateProject";
import ProjectList from "../components/ProjectList";

export default {

  name: 'Home',
  components: {
    CreateProject,
    ProjectList
  },
  computed: {
  },
}
</script>
