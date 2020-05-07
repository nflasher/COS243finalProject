<template>
    <div>
        <header>Authorize a Driver to a Vehicle</header>
        <v-form v-model="valid">

            <v-select label="Select vehicle from license Number" :items="vehicle" v-model="vehicleId"></v-select>
            <v-select label="Select driver" :items="driver" v-model="driverId"></v-select>

            <v-spacer></v-spacer>

            <v-btn v-bind:disabled="!valid" v-on:click="authorizeDriver"
            >Authorize driver
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

                dialogHeader: "<no dialogHeader>",
                dialogText: "<no dialogText>",
                dialogVisible: false,

                vehicleId:"",
                driverId: "",

                vehicle: [],
                driver: [],

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
                .get("/vehicle")
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
            authorizeDriver() {
                this.$axios
                    .post("/authorization", {
                        driverId: this.driverId,
                        vehicleId: this.vehicleId,

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