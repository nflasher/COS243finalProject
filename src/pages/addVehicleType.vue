<template>
    <div>
        <header>Add a vehicle here.</header>
        <v-form v-model="valid">
            <v-text-field
                    v-model="type"
                    v-bind:rules="rules.required"
                    label="type"
            ></v-text-field>

            <v-spacer>

            </v-spacer>

            <v-btn v-bind:disabled="!valid" v-on:click="addVehicleType"
            >add vehicle type
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

                type: "",

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
                    ],

                },
            };


        },

        methods: {
            addVehicleType() {
                this.$axios
                    .post("/vehicleType", {
                        type: this.type,
                    })
                    .then((result) => {
                        this.showSnackbar(result.data.msge);
                        if (result.data.ok) {
                            this.showSnackbar("Success added vehicle type!", result.data.msge);
                        }
                        else{
                            this.showSnackbar("Failure buddy", result.data.msge);
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