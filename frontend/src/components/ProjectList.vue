<template>
    <div>
        <v-card v-if="projects.length == 0"
                class="mx-auto"
                outlined
        >
            <v-card-text>
                Create project.
            </v-card-text>
        </v-card>
        <v-card v-for="(project) in projects"
                class="mx-auto"
                outlined
                :key="project.id"
        >
            <project-item :project="project" />

        </v-card>

    </div>
</template>
<script>
    import ProjectItem from "./ProjectItem";
    export default {
        name: 'ProjectList',
        components: {
            ProjectItem
        },
        data: () => ({
        }),
        computed: {
            projects() {
                return this.$store.getters.projects
            }
        },
        mounted() {
            this.$store.dispatch('getProjects')
        },
    }
</script>