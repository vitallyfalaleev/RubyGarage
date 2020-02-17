<template>
    <span v-show="!deleted">
        <v-form v-if="edit" @submit.prevent="updateTask()">
            <v-row>
                <v-col
                        cols="12"
                        md="8">
                    <v-text-field
                            v-model="task.name"
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
                                    v-model="task.date"
                                    label="Pick date"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="task.date" @input="datePicker = false"></v-date-picker>
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
        <v-list-item v-else>
        <v-list-item-action>
            <v-checkbox
                    v-model="task.done"
                    color="primary"
                    @change="taskDone()"
            ></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>{{task.name}}</v-list-item-title>
            <v-list-item-subtitle>{{task.date}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn-toggle
                    dense
                    group
            >
                <v-btn text @click="edit = !edit">
                    <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn text @click="deleteTask()">
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </v-btn-toggle>
        </v-list-item-action>
    </v-list-item>
    </span>
</template>
<script>
    import axios from "axios";

    export default {
        name: 'TaskItem',
        props: ["task"],
        data: () => ({
            datePicker: false,
            edit: false,
            deleted: false
        }),
        methods: {
            updateTask(){
                axios
                    .put('http://localhost:5000/api/v1/tasks/' + this.task.id, {
                            task: {
                                name: this.task.name,
                                date: this.task.date,
                            }
                        },
                        {
                            headers: {
                                Authorization: sessionStorage.getItem('token')
                            }
                        })
                    .then(() => {
                        this.edit = !this.edit
                    })
            },
            taskDone(){
                this.task.done = !this.task.done
                axios
                    .put('http://localhost:5000/api/v1/tasks/' + this.task.id, {
                            task: {
                                done: !this.task.done
                            }
                        },
                        {
                            headers: {
                                Authorization: sessionStorage.getItem('token')
                            }
                        })
            },
            deleteTask(){
                axios
                    .delete('http://localhost:5000/api/v1/tasks/' + this.task.id,
                        {
                            headers: {
                                Authorization: sessionStorage.getItem('token')
                            }
                        })
                        .then(() => {
                            this.deleted = !this.deleted
                        })
            }
        },
    }
</script>