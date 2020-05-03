<template>
    <div>
        <header>Add a vehicle here.</header>
        <v-form v-model="valid">
            <v-text-field
                    v-model="make"
                    v-bind:rules="rules.required"
                    label="make"
            ></v-text-field>
            <v-text-field
                    v-model="model"
                    v-bind:rules="rules.required"
                    label="model"
            ></v-text-field>
            <v-text-field
                    v-model="color"
                    v-bind:rules="rules.required"
                    label="color"
            >
            </v-text-field>
            <v-text-field
                    v-model="capacity"
                    v-bind:rules="rules.numbersOnly"
                    label="capacity"
            >
            </v-text-field>
            <v-text-field
                    v-model="mpg"
                    v-bind:rules="rules.numbersOnly"
                    label="mpg"
            >
            </v-text-field>
            <v-text-field
                    v-model="licenseState"
                    v-bind:rules="rules.required"
                    label="licenseState"
            >
            </v-text-field>
            <v-text-field
                    v-model="licenseNumber"
                    v-bind:rules="rules.required"
                    label="licenseNumber"
            >
            </v-text-field>


            <v-select label="Select vehicle type" :items="vehicleTypes" v-model="vehicleTypeId"></v-select>



<v-spacer>

</v-spacer>


            <v-btn v-bind:disabled="!valid" v-on:click="addVehicle"
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

                make: "",
                model: "",
                color: "",
                capacity: "",
                mpg: "",
                licenseState: "",
                licenseNumber: "",
                vehicleTypeId: "",

                vehicleTypes: [],

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

        methods: {
            addVehicle() {
                this.$axios
                    .post("/vehicle", {
                        make: this.make,
                        model: this.model,
                        color: this.color,
                        capacity: this.capacity,
                        mpg: this.mpg,
                        licenseState: this.licenseState,
                        licenseNumber: this.licenseNumber,
                        vehicleTypeId: this.vehicleTypeId,
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