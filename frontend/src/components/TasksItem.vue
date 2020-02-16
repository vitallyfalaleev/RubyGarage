<template>
    <v-list-item-group>
        <v-list-item
                v-for="task in tasks"
                :key="task.id"
                :disabled="task.done"
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
                <v-list-item-subtitle>{{task.date}}</v-list-item-subtitle>
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
    </v-list-item-group>
</template>
<script>
    export default {
        name: "TaskItem",
        props: ["tasks"]
    }
</script>