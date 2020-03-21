<template>
    <div>
        <v-skeleton-loader
                v-if="listStatus"
                transition="fade-transition"
                height="94"
                type="list-item-two-line"
        >
        </v-skeleton-loader>
        <v-card v-else v-for="(project) in projects"
                class="mx-auto"
                outlined
                :key="project.id"
        >
            <ProjectItem :project="project" />
        </v-card>
    </div>
</template>
<script>
    import ProjectItem from "./ProjectItem";
    export default {
        name: 'ProjectList',
        components: {
            ProjectItem,
        },
        data: () => ({
        }),
        computed: {
            projects() {
                return this.$store.getters.projects
            },
            listStatus() {
                return this.$store.getters.listStatus
            },
        },
        mounted() {
            this.$store.dispatch('getProjects')
        },
    }
</script>