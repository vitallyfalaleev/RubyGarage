<template>
    <v-row>
        <v-col cols="12" v-if="listStatus"
        >
            <v-skeleton-loader
                    transition="fade-transition"
                    type="list-item-two-line"
            >
            </v-skeleton-loader>
        </v-col>
        <v-col cols="12" v-else>
            <v-row>
                <v-col cols="12"
                       v-for="(project) in projects"
                       :key="project.id"
                >
                    <ProjectItem :project="project" />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
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