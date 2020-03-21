<template>
    <v-card  min-height="250">
        <v-card-actions>
            <v-btn text @click="modalClose">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-actions>
        <v-tabs :grow="true">
            <v-tabs-slider></v-tabs-slider>
            <v-tab key="login">Login</v-tab>
            <v-tab key="registration">Registration</v-tab>
            <v-tab-item key="login">
                <UserProfileFormsLogin />
            </v-tab-item>
            <v-tab-item key="registration">
                <UserProfileFormsRegistration />
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>
<script>
    import UserProfileFormsRegistration from "./UserProfileFormsRegistration";
    import UserProfileFormsLogin from "./UserProfileFormsLogin";
    export default {
        name: 'UserProfileForms',
        data: () => ({
        }),
        methods: {
            modalClose() {
                this.$store.dispatch('setModal')
            }
        },
        components: {
            UserProfileFormsRegistration,
            UserProfileFormsLogin
        }
    }
</script>