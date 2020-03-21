<template>
    <div>
        <UserProfileEditing v-if="isLogin"/>
        <UserProfileForms v-else />
    </div>
</template>
<script>
    import UserProfileEditing from "./UserProfileEditing";
    import UserProfileForms from "./UserProfileForms";
    export default {
        name: "UserProfile",
        computed: {
            modal() {
                return this.$store.getters.modal
            },
            isLogin() {
                return this.$store.getters.isLogin
            }
        },
        components: {
            UserProfileEditing,
            UserProfileForms,
        }
    }
</script>