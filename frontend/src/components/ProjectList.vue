<template>
    <div>
        <v-card>
            <v-card-title>Create Project</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="createProject">
                    <v-row>
                        <v-col
                                cols
                                col="10"
                                md="10"
                        >
                            <v-text-field
                                    v-model="title"
                                    :counter="120"
                                    :rules="projectTitleRules"
                                    :error="sendCheck"
                                    label="Project Name"
                                    required
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols
                                col="2"
                                md="2"
                        >
                            <v-btn
                                    color="success"
                                    class="mr-4"
                                    :loading="this.status === 'loading' ? true : false"
                                    :disabled="this.checkTitle()"
                                    type="submit"
                            >
                                Create
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
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
            title: '',
            sendCheck: false,
            projectTitleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 120) || 'Name must be less than 120 characters',
            ],
        }),
        methods: {
            createProject() {
                this.$store.dispatch('createProject', {title: this.title})
                    .then(() => {
                        this.$store.dispatch('getProjects')
                    })
            },
            checkTitle(){
                return !(this.title !== '' && this.title.length <= 120 )
            },
        },
        computed: {
            projects() {
                return this.$store.getters.projects
            },
            status() {
                return this.$store.getters.status
            },
        },
        mounted() {
            this.$store.dispatch('getProjects')
        },
    }
</script>