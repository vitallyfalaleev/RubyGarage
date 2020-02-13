<template>
    <v-card v-if="this.isLogin">
        <v-card-actions>
            <v-btn text @click="modalClose">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-actions>
        <v-card-title>Edit profile</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="">
                <v-text-field
                        v-model="userEmail"
                        label="E-mail"
                        required
                ></v-text-field>
                <v-text-field
                        label="Password"
                        type="password"
                        required
                ></v-text-field>
                <v-btn
                        color="success"
                        medium
                        type="submit" >submit</v-btn>
                <v-btn
                        @click="logout"
                        color="warning"
                        right
                        absolute
                        medium>logout</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
    <v-card v-else>
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
            </v-tab-item>
            <v-tab-item key="registration">
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
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>
<script>
    import axios from "axios"

    export default {
        name: "UserProfile",
        data: () => ({
            registrationForm: {
                email: "",
                password: "",
                password_confirmation: ""
            },
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
            formError: "",
            isLogin: false,
            userEmail: ''
        }),
        methods: {
            userRegistration() {
                axios.post('http://localhost:5000/api/v1/signup',
                    {
                        user: this.registrationForm
                    }
                )
                    .then(response => {
                            if(response.data.status === 400){
                                this.formError = response.data.errors.email
                            } else {
                                this.$store.dispatch('createSession', {
                                        user: {
                                            email: this.registrationForm.email,
                                            password: this.registrationForm.password
                                        }
                                    }
                                )
                                    .then(()=>{
                                        this.isLogin = true
                                        this.userEmail = sessionStorage.getItem('user-email')
                                    })
                            }
                        }
                    )
            },
            checkPassword(form) {
                return !(form.password !== '' && form.password_confirmation !== ''  && form.password === form.password_confirmation )
            },
            checkLoginPassword(form){
                return !(form.password !== '' && form.email !== '' && form.password.length >= 6 )
            },
            newSession() {
                this.$store.dispatch('createSession', {user: this.loginForm})
                    .then(()=>{
                        this.isLogin = true
                        this.userEmail = sessionStorage.getItem('user-email')
                    })
            },
            logout() {
                this.isLogin = false
                this.$router.go()
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user-id')
                sessionStorage.removeItem('user-email')
            },
            modalClose() {
                this.modal = !this.modal
            }
        },
        computed: {
            status() {
                return this.$store.getters.status
            },
            modal: {
                get: function() {
                    return this.$store.getters.modal
                },
                set: function() {
                    return !this.$store.dispatch('setModal', false)
                }
            }
        },
        mounted() {
            if(sessionStorage.getItem('token') !== null){
                this.isLogin = true
                this.userEmail = sessionStorage.getItem('user-email')
            }
        },
    }
</script>