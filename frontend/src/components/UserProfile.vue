<template>
    <v-card>
        <v-tabs :grow="true">
            <v-tabs-slider></v-tabs-slider>
            <v-tab key="login">Login</v-tab>
            <v-tab key="registration">Registration</v-tab>
            <v-tab-item key="login">
                <v-card-text>
                    <v-form @submit.prevent="">
                        <v-text-field
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
                        <v-btn color="red darken-1" text @click="modal = false">Close</v-btn>
                    </v-form>
                </v-card-text>
            </v-tab-item>
            <v-tab-item key="registration">
                <v-card-text>
                    <v-form @submit.prevent="userRegistration">
                        <v-text-field
                                v-model="registrationForm.email"
                                :rules="registrationFormRules"
                                :error-messages="emailTaken"
                                label="E-mail"
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="registrationForm.password"
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
                                type="submit">
                            submit
                        </v-btn>
                        <v-btn color="red darken-1" text @click="modal = false">Close</v-btn>
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
            registrationFormRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            emailTaken: ""
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
                                this.emailTaken = response.data.errors.email
                            } else {
                                console.log('y', response.data)
                            }
                        }
                    )
            },
            checkPassword(form) {
                return !(form.password !== '' && form.password_confirmation !== ''  && form.password === form.password_confirmation )
            },
        }
    }
</script>