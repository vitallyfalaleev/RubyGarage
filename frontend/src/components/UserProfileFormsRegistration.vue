<template>
    <v-card-text>
        <v-form @submit.prevent="userRegistration">
            <v-text-field
                    v-model="registrationForm.email"
                    :rules="emailFormRules"
                    :error-messages="formError"
                    label="E-mail"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="registrationForm.password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="registrationForm.password_confirmation"
                    label="Password confirmation"
                    type="password"
                    required
            ></v-text-field>
            <v-btn
                    :disabled="this.checkPassword(registrationForm)"
                    color="success"
                    medium
                    :loading="this.status === 'loading' ? true : false"
                    type="submit">
                submit
            </v-btn>
        </v-form>
    </v-card-text>
</template>
<script>
    export default {
        name: 'UserProfileFormsRegistration',
        data: () => ({
            registrationForm: {
                email: "",
                password: "",
                password_confirmation: ""
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
            userRegistration() {
                this.$store.dispatch('userRegistration', {user: this.registrationForm})
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