<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <ProjectCreation />
            </v-col>
            <v-col cols="12" v-if="projects.length == 0">
                <v-card
                >
                    <v-card-text>
                        Create project.
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
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