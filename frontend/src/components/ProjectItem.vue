<template>
    <div>
        <v-list-item two-line >
            <v-list-item-content>
                <v-list-item-title
                        v-if="!isEdit"
                        class="headline mb-1">{{project.title}}</v-list-item-title>
                <v-form
                        v-else
                        @submit.prevent="updateProject()"
                >
                    <v-text-field
                            v-model="title"
                            :placeholder="project.title"
                            :rules="projectTitleRules"
                            :counter="120"
                            label="Project Name"
                            required
                    ></v-text-field>
                    <v-btn
                            color="success"
                            class="mr-4"
                            type="submit"
                    >
                        Save
                    </v-btn>
                </v-form>
                <task-list :project="project"/>
            </v-list-item-content>
        </v-list-item>
        <v-card-actions>
            <v-btn-toggle
                    dense
                    group
            >
                <v-btn text
                       @click="isEdit = !isEdit"
                >
                    <v-icon v-if="!isEdit">mdi-pencil-outline</v-icon>
                    <v-icon v-else>mdi-cancel</v-icon>
                </v-btn>

                <v-btn text tile
                       @click="deleteProject()"
                >
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </v-btn-toggle>
        </v-card-actions>
    </div>
</template>
<script>
    import axios from 'axios'
    import TaskList from "./TaskList";
    export default {
        name: "ProjectItem",
        components: {
            TaskList
        },
        props: ['project'],
        data: () => ({
            isEdit: false,
            title: '',
            projectTitleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 120) || 'Name must be less than 120 characters',
            ],
        }),
        methods: {
            updateProject(){
                if(this.title === ""){
                    this.isEdit = !this.isEdit
                } else {
                    console.log(this.project.id)
                    axios
                        .put('http://localhost:5000/api/v1/projects/' + this.project.id,
                            {
                                project: {
                                    title: this.title,
                                }
                            },
                            {
                                headers: {
                                    Authorization: sessionStorage.getItem('token')
                                }
                            })
                        .then(
                            () => {
                                this.project.title = this.title
                                this.isEdit = !this.isEdit
                            }
                        )
                }
            },
            deleteProject(){
                axios
                    .delete('http://localhost:5000/api/v1/projects/' + this.project.id,
                        {
                            headers: {
                                Authorization: sessionStorage.getItem('token')
                            }
                        })
                    .then(() => {this.$store.dispatch('getProjects')})
            },
        },
    }
</script>