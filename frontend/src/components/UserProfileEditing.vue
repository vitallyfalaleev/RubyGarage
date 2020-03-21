<template>
    <v-card min-height="250">
        <v-card-actions>
            <v-btn text @click="modalClose">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-actions>
        <v-card-title>Profile</v-card-title>
        <v-card-text>
            <v-card-title>{{userEmail}}</v-card-title>
            <v-btn
                    @click="logout"
                    color="warning"
                    right
                    absolute
                    medium>logout</v-btn>
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        name: 'UserProfileEditing',
        methods: {
            logout() {
                this.$store.dispatch('destroySession')
            },
            modalClose() {
                this.$store.dispatch('setModal')
            }
        },
        computed: {
            userEmail() {
                return this.$store.getters.userEmail
            },
        }
    }
</script>