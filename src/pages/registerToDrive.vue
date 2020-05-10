<template>
    <div>
        <header>Sign up to drive</header>
        <h4 class="display-1">Rides</h4>

        <v-data-table
                class="elevation-1"
                v-bind:headers="headers"
                v-bind:items="rideInfo"
        >
            <template v-slot:item="{ item }">
                <tr v-bind:class="itemClass(item)">
                    <td>{{ item.id }}</td>
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

            <v-select label="Select who you are (just you) (ONLY YOU)" :items="driver" v-model="passengerId"></v-select>
            <v-select label="Select ride" :items="rides" v-model="rideId"></v-select>

            <v-spacer></v-spacer>

            <v-btn v-bind:disabled="!valid" v-on:click="signUp"
            >Sign up
            </v-btn>
        </v-form>



        <div class="text-xs-center">
            <v-dialog v-model="dialogVisible" width="500">
                <v-card>
                    <v-card-title primary-title>
                        {{ dialogHeader }}
                    </v-card-title>

                    <v-card-text>
                        {{ dialogText }}
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text v-on:click="hideDialog">Okay</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
    export default {

        data() {
            return {
                valid: false, // Are all the fields in the form valid?
                headers: [
                    { text: "Ride id", value: "id" },
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

                dialogHeader: "<no dialogHeader>",
                dialogText: "<no dialogText>",
                dialogVisible: false,

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
                .get("/report")
                .then(result => {
                    this.rides = result.data.map(ride => ({
                        text: ride.id,
                        value: ride.id
                    }));
                    // Add a choice to the beginning of the list. Give it an invalid
                    // value (vehicle IDs assigned by Postgres won't ever be negative).
                    this.rides.unshift({
                        text: "Choose ride id of your ride",
                        value: -1,
                    });
                    // Set the v-model datum to show this choice by default.
                    this.rideId = -1;
                });
        },

        beforeMount: function() {
            this.$axios.get("/report").then(response => {
                this.rideInfo = response.data.map(rideInformation => ({
                    id: rideInformation.id,
                    date: rideInformation.date,
                    time: rideInformation.time,
                    distance: rideInformation.distance,
                    fuelPrice: rideInformation.fuelPrice,
                    fee: rideInformation.fee,
                    vehicleId: rideInformation.vehicleId,
                    fromLocationId: rideInformation.fromLocationId,
                    toLocationId: rideInformation.toLocationId,
                    passengers: rideInformation.passenger.firstName,
                    drivers: rideInformation.driver.firstName

                }));
            });
        },

        created: function() {
            this.$axios
                .get("/passenger")
                .then(result => {
                    this.passengers = result.data.map(passenger => ({
                        text: passenger.firstName,
                        value: passenger.id
                    }));
                    // Add a choice to the beginning of the list. Give it an invalid
                    // value (vehicle IDs assigned by Postgres won't ever be negative).
                    this.passengers.unshift({
                        text: "Choose your name",
                        value: -1,
                    });
                    // Set the v-model datum to show this choice by default.
                    this.passengerId = -1;
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
                    .post("/passengers", {
                        passengerId: this.passengerId,
                        rideId: this.rideId,

                    })
                    .then((result) => {
                        this.showDialog(result.data.msge);
                        if (result.data.ok) {
                            this.showDialog("Success", result.data.msge);
                        }
                        else{
                            this.showDialog("Failure", result.data.msge);
                        }
                    })
                    .catch((err) => this.showDialog(err));
            },

            showDialog: function (header, text) {
                this.dialogHeader = header;
                this.dialogText = text;
                this.dialogVisible = true;
            },

            hideDialog: function () {
                this.dialogVisible = false;
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