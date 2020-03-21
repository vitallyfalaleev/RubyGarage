<template>
    <v-card>
        <v-card-title>Create Project </v-card-title>
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
</template>
<script>
    export default {
        name: 'ProjectCreation',
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
            },
            checkTitle(){
                return !(this.title !== '' && this.title.length <= 120 )
            },
        },
        computed: {
            status() {
                return this.$store.getters.status
            },
        }
    }
</script>