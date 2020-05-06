<template>
    <div>
        <header>Sign up for a ride</header>
        <v-form v-model="valid">

            <v-select label="Select who you are (just you) (ONLY YOU)" :items="passengers" v-model="passengerId"></v-select>
            <v-select label="Select ride" :items="rides" v-model="rideId"></v-select>

            <v-spacer></v-spacer>

            <v-btn v-bind:disabled="!valid" v-on:click="signUp"
            >Authorize driver
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

                rideId:"",
                passengerId: "",

                rides: [],
                passengers: [],

                snackbar: {
                    show: false,
                    msge: "",
                },

                rules: {
                    required: [
                        (val) => val.length > 0 || "Required",
                    ],

                },
            };


        },

        mounted: function() {
            this.$axios
                .get("/ride")
                .then(result => {
                    this.vehicle = result.data.map(vehicle => ({
                        text: vehicle.licenseNumber,
                        value: vehicle.id
                    }));
                    // Add a choice to the beginning of the list. Give it an invalid
                    // value (vehicle IDs assigned by Postgres won't ever be negative).
                    this.vehicle.unshift({
                        text: "Choose license number",
                        value: -1,
                    });
                    // Set the v-model datum to show this choice by default.
                    this.vehicleId = -1;
                });
        },

        created: function() {
            this.$axios
                .get("/driver")
                .then(result => {
                    this.driver = result.data.map(driver => ({
                        text: driver.firstName,
                        value: driver.id
                    }));
                    // Add a choice to the beginning of the list. Give it an invalid
                    // value (vehicle IDs assigned by Postgres won't ever be negative).
                    this.driver.unshift({
                        text: "Choose driver",
                        value: -1,
                    });
                    // Set the v-model datum to show this choice by default.
                    this.driverId = -1;
                });
        },

        methods: {
            signUp() {
                this.$axios
                    .post("/authorization", {
                        driverId: this.driverId,
                        vehicleId: this.vehicleId,

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