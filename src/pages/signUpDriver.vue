<template>
    <div>
        <header>Add a ride here.</header>
        <v-form v-model="valid">
            <v-text-field
                    type="firstName"
                    v-model="firstName"
                    v-bind:rules="rules.required"
                    label="First Name"
            ></v-text-field>
            <v-text-field
                    type="lastName"
                    v-model="lastName"
                    v-bind:rules="rules.required"
                    label="Last Name"
            ></v-text-field>
            <v-text-field
                    type="phone"
                    v-model="phone"
                    v-bind:rules="rules.numbersOnly"
                    label="Phone Number"
            >
            </v-text-field>
            <v-text-field
                    type="licenseNumber"
                    v-model="licenseNumber"
                    v-bind:rules="rules.required"
                    label="license Number"
            >
            </v-text-field>



            <v-spacer>

            </v-spacer>


            <v-btn v-bind:disabled="!valid" v-on:click="signUpDriver"
            >sign up
            </v-btn>
        </v-form>
        <v-snackbar v-model="snackbar.show">
            {{ snackbar.msge }}
            <v-btn text color="primary" @click="snackbar.show = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                valid: false, // Are all the fields in the form valid?

                firstName: "",
                lastName: "",
                phone: "",
                licenseNumber: "",

                snackbar: {
                    show: false,
                    msge: "",
                },

                rules: {
                    required: [
                        (val) => val.length > 0 || "Required",
                    ],
                    numbersOnly: [
                        (val) => val.length > 0 || "Required",
                        (val) => /^[1-9]\d*(\.\d+)?$/.test(val) || "Numerical values only"
                    ],

                },
            };


        },

        methods: {
            signUpDriver() {
                this.$axios
                    .post("/driver", {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phone: this.phone,
                        licenseNumber: this.licenseNumber,
                    })
                    .then((result) => {
                        this.showSnackbar(result.data.msge);
                        if (result.data.ok) {
                            this.showSnackbar("Success", result.data.msge);
                        }
                        else{
                            this.showSnackbar("Failure", result.data.msge);
                        }
                    })
                    .catch((err) => this.showSnackbar(err));
            },



            showSnackbar(msge) {
                this.snackbar.msge = msge;
                this.snackbar.show = true;
            },
        },
    }
</script>

<style scoped>

</style>