<template>
    <div>
        <header>Sign up for a ride</header>
        <h4 class="display-1">Rides</h4>

        <v-data-table
                class="elevation-1"
                v-bind:headers="headers"
                v-bind:items="rideInfo"
        >
            <template v-slot:item="{ item }">
                <tr v-bind:class="itemClass(item)">
                    <td>{{ item.date }}</td>
                    <td>{{ item.time }}</td>
                    <td>{{ item.distance }}</td>
                    <td>{{ item.fuelPrice }}</td>
                    <td>{{ item.fee }}</td>
                    <td>{{ item.vehicleId }}</td>
                    <td>{{ item.fromLocationId }}</td>
                    <td>{{ item.toLocationId }}</td>
                    <td>{{ item.passengers }}</td>
                    <td>{{ item.drivers }}</td>

                </tr>
            </template>
        </v-data-table>
        <v-form v-model="valid">

            <v-select label="Select who you are (just you) (ONLY YOU)" :items="passengers" v-model="passengerId"></v-select>
            <v-select label="Select ride" :items="rides" v-model="rideId"></v-select>

            <v-spacer></v-spacer>

            <v-btn v-bind:disabled="!valid" v-on:click="signUp"
            >Sign up
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
                headers: [
                    { text: "Date", value: "date" },
                    { text: "Time", value: "time" },
                    { text: "Distance", value: "distance" },
                    { text: "Fuel Price", value: "fuelPrice" },
                    { text: "Fee", value: "fee" },
                    { text: "Vehicle type", value: "vehicleId" },
                    { text: "From Location", value: "fromLocationId" },
                    { text: "To Location", value: "toLocationId" },
                    { text: "Passengers", value: "passengers" },
                    { text: "Driver", value: "drivers" }
                ],
                rideInfo: [],

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

            itemClass(item) {
                const currentAccount = this.$store.state.currentAccount;
                if (currentAccount && currentAccount.id === item.id) {
                    return "currentAccount";
                }
            },

            signUp() {
                this.$axios
                    .post("/passenger", {
                        passengerId: this.passengerId,
                        rideId: this.rideId,

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