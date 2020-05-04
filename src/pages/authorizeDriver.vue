<template>
    <div>
        <header>Authorize a Driver to a Vehicle</header>
        <v-form v-model="valid">

            <v-select label="Select vehicle from license Number" :items="vehicle" v-model="vehicleId"></v-select>
            <v-select label="Select driver" :items="driver" v-model="driverId"></v-select>

            <v-spacer></v-spacer>

            <v-btn v-bind:disabled="!valid" v-on:click="authorizeDriver"
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
                    this.vehicle = result.data.map(vehicleType => ({
                        text: vehicleType.licenseNumber,
                        value: vehicleType.id
                    }));
                });
        },

        created: function() {
            this.$axios
                .get("/driver")
                .then(result => {
                    this.driver = result.data.map(location => ({
                        text: location.firstName,
                        value: location.id
                    }));
                });
        },

        methods: {
            authorizeDriver() {
                this.$axios
                    .post("/authorization", {
                        vehicleId: this.vehicleId,
                        driverId: this.driverId,
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