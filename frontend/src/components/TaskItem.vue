<template>
    <v-card outlined :class="expired? 'red--text' : '' ">
        <v-row v-if="!edit">
            <v-col cols="1" class="d-flex justify-center align-center"
            >
                <v-checkbox
                        v-model="task.done"
                        color="primary"
                        @change="taskDone()"
                ></v-checkbox>
            </v-col>
            <v-col>
                <v-card-title>
                    {{task.name}}
                </v-card-title>
                <v-card-subtitle>
                    {{task.date}}
                </v-card-subtitle>
            </v-col>
            <v-col cols="2">
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
            </v-col>
        </v-row>
        <v-form v-else @submit.prevent="updateTask()">
            <v-row>
                <v-col cols="1" class="d-flex justify-center align-center"
                >
                    <v-checkbox
                            v-model="task.done"
                            color="primary"
                            @change="taskDone()"
                    ></v-checkbox>
                </v-col>
                <v-col>
                    <v-text-field
                            v-model="task.name"
                            :counter="120"
                            label="Task Name"
                            required
                    ></v-text-field>
                </v-col>
                <v-col cols="2">
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
                <v-col cols="2">
                    <v-btn-toggle
                            dense
                            group
                    >
                        <v-btn text type="submit">
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                        <v-btn text @click="edit = !edit">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</template>
<script>
    export default {
        name: 'TaskItem',
        props: ["task"],
        data: () => ({
            minDate: new Date().toISOString().substr(0, 10),
            datePicker: false,
            edit: false,
            expired: false
        }),
        methods: {
            exp(){
                let now = new Date().toISOString().substr(0, 10);
                if(now>this.task.date){
                    this.expired = true
                } else {
                    this.expired = false
                }
            },
            updateTask(){
                this.$store.dispatch('updateTask', {id: this.task.id, name: this.task.name, date: this.task.date})
                    .then(() => {
                        this.edit = !this.edit
                    })
            },
            taskDone(){
                this.$store.dispatch('doneTask', {id: this.task.id, status: this.task.done})
            },
            deleteTask(){
                this.$store.dispatch('deleteTask', this.task)
            }
        },
        beforeMount() {
            this.exp()
        }
    }
</script>