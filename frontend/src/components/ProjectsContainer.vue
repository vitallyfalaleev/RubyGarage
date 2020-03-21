<template>
    <v-container>
        <ProjectCreation />
        <v-card v-if="projects.length == 0"
                class="mx-auto"
                outlined
        >
            <v-card-text>
                Create project.
            </v-card-text>
        </v-card>

        <ProjectList/>
    </v-container>
</template>
<script>
    import ProjectCreation from "./ProjectCreation";
    import ProjectList from "./ProjectList";
    export default {
        name: 'ProjectContainer',
        components: {
            ProjectCreation,
            ProjectList,
        },
        data: () => ({
        }),
        computed: {
            projects() {
                return this.$store.getters.projects
            },
        },
    }
</script>