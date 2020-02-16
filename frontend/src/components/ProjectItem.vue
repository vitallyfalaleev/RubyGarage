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
                <v-form @submit.prevent="createTask()">
                    <v-row>
                        <v-col
                                cols="12"
                                md="8">
                            <v-text-field
                                    v-model="taskTitle"
                                    :counter="120"
                                    label="Task Name"
                                    required
                            ></v-text-field>
                        </v-col>
                        <v-col
                                cols="12"
                                md="3">
                            <v-menu
                                    v-model="datePicker"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-text-field
                                            v-model="taskDate"
                                            label="Pick date"
                                            readonly
                                            v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker v-model="taskDate" @input="datePicker = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col
                                cols="12"
                                md="1">
                            <v-btn text
                                   type="submit"
                            >
                                <v-icon>mdi-send</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
                <TasksItem :tasks="tasks"/>
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
    import TasksItem from "./TasksItem";
    export default {
        name: "ProjectItem",
        components: {
            TasksItem
        },
        props: ['project'],
        data: () => ({
            isEdit: false,
            title: '',
            tasks: [],
            taskTitle: '',
            taskDate: new Date().toISOString().substr(0, 10),
            datePicker: false
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
                        this.tasks = res.data
                    })
            },
            createTask(){
                console.log(typeof this.taskDate)
                axios
                    .post('http://localhost:5000/api/v1/tasks', {
                            task: {
                                name: this.taskTitle,
                                date: this.taskDate,
                                project_id: this.project.id,
                                user_id: this.project.user_id
                            }
                        },
                        {
                            headers: {
                                Authorization: sessionStorage.getItem('token')
                            }
                        })
                    .then(() => {
                        console.log(this.taskDate)
                        this.getTasks()
                    })
            }
        },
        mounted() {
            this.getTasks()
        },
    }
</script>