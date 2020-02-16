<template>
    <div>
        <v-list-item three-line>
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
                <v-list>
                    <v-list-item
                            v-for="(task, index) in tasks"
                            :key="index"
                    >
                            <v-list-item-action>
                                <v-checkbox
                                        v-model="task.done"
                                        color="primary"
                                        @click="task.done = !task.done"
                                ></v-checkbox>
                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title>{{task.name}}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn-toggle
                                        dense
                                        group
                                >
                                    <v-btn text>
                                        <v-icon>mdi-pencil-outline</v-icon>
                                    </v-btn>

                                    <v-btn text tile>
                                        <v-icon>mdi-delete-outline</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-list-item-action>

                    </v-list-item>

                </v-list>

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
    export default {
        name: "ProjectItem",
        props: ['project'],
        data: () => ({
           isEdit: false,
            title: '',
            tasks: []
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
            getTasks(){
                axios
                    .get('http://localhost:5000/api/v1/tasks', {
                        params: {
                            project_id: this.project.id
                        },
                        headers: {
                            Authorization: sessionStorage.getItem('token')
                        }
                    })
                    .then(res => {
                        console.log(res)
                        this.tasks = res.data
                    })
            }
        },
        computed: {

        },
        mounted() {
            this.getTasks()
        },
    }
</script>