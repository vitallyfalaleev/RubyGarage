<template>
    <div>
        <v-list-item two-line >
            <v-list-item-content>
                <v-list-item-title
                        v-if="!isEdit"
                        class="headline mb-1">{{project.attributes.title}}</v-list-item-title>
                <v-form
                        v-else
                        @submit.prevent="updateProject()"
                >
                    <v-row>
                        <v-col>
                            <v-text-field
                                    v-model="title"
                                    :placeholder="project.attributes.title"
                                    :rules="projectTitleRules"
                                    :counter="120"
                                    label="Project Name"
                                    required
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn
                                    color="success"
                                    class="mr-4"
                                    type="submit"
                            >
                                Save
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
                <task-list :data="{tasks: project.attributes.tasks, id: project.id}"/>
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
                    this.$store.dispatch('updateProject', {id: this.project.id, title: this.title})
                        .then(
                            () => {
                                this.project.attributes.title = this.title
                                this.isEdit = !this.isEdit
                            }
                        )
                }
            },
            deleteProject(){
                this.$store.dispatch('deleteProject', this.project.id)
            },
        },
    }
</script>