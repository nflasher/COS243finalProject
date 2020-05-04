<template>
    <div>
        <header>Add a ride here.</header>
        <v-form v-model="valid">
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
                    v-model="distance"
                    v-bind:rules="rules.numbersOnly"
                    label="distance"
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


            <v-select label="Select vehicle type" :items="vehicleTypes" v-model="vehicleId"></v-select>
            <v-select label="Select from location" :items="Locations" v-model="fromLocationId"></v-select>
            <v-select label="Select to location" :items="Locations" v-model="toLocationId"></v-select>



            <v-spacer>

            </v-spacer>


            <v-btn v-bind:disabled="!valid" v-on:click="addRide"
            >add vehicle
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
                });
        },

        methods: {
            addRide() {
                this.$axios
                    .post("/ride", {
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