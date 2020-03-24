<template>
    <v-card>
        <v-card-text>
            <v-form @submit.prevent="createTask()">
                <v-row>
                    <v-col
                            cols="12"
                            md="8">
                        <v-text-field
                                v-model="task.title"
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
                            <v-date-picker v-model="task.date" :min="minDate" @input="datePicker = false"></v-date-picker>
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card v-for="(task) in data.tasks" :key="task.id">
                <TaskItem :task="task" />
        </v-card>

    </v-card>
</template>
<script>
    import TaskItem from "./TaskItem";
    export default {
        name: "TaskList",
        props: ["data"],
        data: () => ({
            task: {
                title: '',
                date: new Date().toISOString().substr(0, 10),
            },
            minDate: new Date().toISOString().substr(0, 10),
            datePicker: false,
            taskTitleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length <= 120) || 'Title must be less than 120 characters',
            ],
        }),
        components: {
            TaskItem
        },
        methods: {
            createTask(){
                this.$store.dispatch('createTask', {task: this.task,
                    project_id: this.data.id})
            },
        },
    }
</script>