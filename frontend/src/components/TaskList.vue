<template>
    <v-list-item-group inactive>
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
        <span
                v-for="task in tasks"
                :key="task.id"
                :disabled="task.done"
        >
            <task-item :task="task" />
        </span>
    </v-list-item-group>
</template>
<script>
    import TaskItem from "./TaskItem";
    import axios from "axios";
    export default {
        name: "TaskList",
        props: ["project"],
        data: () => ({
            tasks: [],
            taskTitle: '',
            taskDate: new Date().toISOString().substr(0, 10),
            datePicker: false
        }),
        components: {
            TaskItem
        },
        methods: {
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
                        this.getTasks()
                    })
            }

        },
        mounted() {
            this.getTasks()
        }
    }
</script>