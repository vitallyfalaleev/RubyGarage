<template>
    <v-card-text>
        <v-form @submit.prevent="newSession">
            <v-text-field
                    v-model="loginForm.email"
                    :rules="emailFormRules"
                    :error-messages="formError"
                    label="E-mail"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="loginForm.password"
                    :rules="passwordRules"
                    :error-messages="formError"
                    label="Password"
                    type="password"
                    required
            ></v-text-field>
            <v-btn
                    color="success"
                    medium
                    :disabled="this.checkLoginPassword(loginForm)"
                    :loading="this.status === 'loading' ? true : false"
                    type="submit" >submit</v-btn>
        </v-form>
    </v-card-text>
</template>
<script>
    export default {
        name: 'UserProfileFormsRegistration',
        data: () => ({
            loginForm: {
                email: "",
                password: ""
            },
            emailFormRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password cant be blank',
                v => v.length >= 6 || 'Password must be at least 6 characters.'
            ],
            formError: ""
        }),
        methods: {
            newSession() {
                this.$store.dispatch('createSession', {user: this.loginForm})
            },
            checkPassword(form) {
                return !(form.password !== '' && form.password_confirmation !== ''  && form.password === form.password_confirmation )
            },
            checkLoginPassword(form){
                return !(form.password !== '' && form.email !== '' && form.password.length >= 6 )
            },
        },
        computed: {
            status() {
                return this.$store.getters.status
            },
        },
    }
</script>