<template>
    <div>
        <header>Update a ride here.</header>
        <v-form v-model="valid">

            <v-select label="Select ride id" :items="ids" v-model="id"></v-select>


            <v-text-field
                    type="date"
                    v-model="date"
                    v-bind:rules="rules.required"
                    label="date"
            ></v-text-field>
            <v-text-field
                    type="time"
                    v-model="time"
                    v-bind:rules="rules.required"
                    label="time"
            ></v-text-field>
            <v-text-field
                    type="number"
                    v-model="distance"
                    v-bind:rules="rules.numbersOnly"
                    label="distance (in miles)"
            >
            </v-text-field>
            <v-text-field
                    type="number"
                    v-model="fuelPrice"
                    v-bind:rules="rules.numbersOnly"
                    label="fuel price"
            >
            </v-text-field>
            <v-text-field
                    type="number"
                    v-model="fee"
                    v-bind:rules="rules.numbersOnly"
                    label="fee"
            >
            </v-text-field>


            <v-select label="Select vehicle type" :items="vehicleTypes" v-model="vehicleId"> </v-select>
            <v-select label="Select from location" :items="Locations" v-model="fromLocationId"></v-select>
            <v-select label="Select to location" :items="Locations" v-model="toLocationId"></v-select>



            <v-spacer>

            </v-spacer>


            <v-btn v-bind:disabled="!valid" v-on:click="updateRide"
            >update ride
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

                id: "",
                date: "",
                time: "",
                distance: "",
                fuelPrice: "",
                fee: "",
                vehicleId: "",
                fromLocationId: "",
                toLocationId: "",

                vehicleTypes: [],
                Locations: [],
                ids: [],

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

        mounted: function() {
            this.$axios
                .get("/vehicleType")
                .then(result => {
                    this.vehicleTypes = result.data.map(vehicleType => ({
                        text: vehicleType.type,
                        value: vehicleType.id
                    }));

                    // Add a choice to the beginning of the list. Give it an invalid
                    // value (vehicle IDs assigned by Postgres won't ever be negative).
                    this.vehicleTypes.unshift({
                        text: "Choose vehicle type",
                        value: -1,
                    });
                    // Set the v-model datum to show this choice by default.
                    this.vehicleId = -1;
                });
        },

        created: function() {
            this.$axios
                .get("/location")
                .then(result => {
                    this.Locations = result.data.map(location => ({
                        text: location.address,
                        value: location.id
                    }));

                    // Add a choice to the beginning of the list. Give it an invalid
                    // value (vehicle IDs assigned by Postgres won't ever be negative).
                    this.Locations.unshift({
                        text: "Choose location",
                        value: -1,
                    });
                    // Set the v-model datum to show this choice by default.
                    this.fromLocationId = -1;
                    this.toLocationId = -1;
                });
        },

        beforeMount: function() {
            this.$axios
                .get("/rideId")
                .then(result => {
                    this.ids = result.data.map(rideId => ({
                        text: rideId.id,
                        value: rideId.id
                    }));

                    // Add a choice to the beginning of the list. Give it an invalid
                    // value (vehicle IDs assigned by Postgres won't ever be negative).
                    this.ids.unshift({
                        text: "Choose ride id",
                        value: -1,
                    });
                    // Set the v-model datum to show this choice by default.
                    this.id = -1;
                });
        },

        methods: {
            updateRide() {
                this.$axios
                    .patch("/ride", {
                        id: this.id,
                        date: this.date,
                        time: this.time,
                        distance: this.distance,
                        fuelPrice: this.fuelPrice,
                        fee: this.fee,
                        vehicleId: this.vehicleId,
                        fromLocationId: this.fromLocationId,
                        toLocationId: this.toLocationId,
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