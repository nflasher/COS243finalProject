<template>
    <v-container>
        <div>
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

                    </tr>
                </template>
            </v-data-table>

            <v-snackbar v-model="snackbar.show">
                {{ snackbar.text }}
                <v-btn color="blue" text @click="snackbar.show = false">
                    Close
                </v-btn>
            </v-snackbar>
        </div>
    </v-container>
</template>

<script>
    export default {

        data: function() {
            return {
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
                    { text: "Driver", value: "driver" }
                ],
                rideInfo: [],

                snackbar: {
                    show: false,
                    text: ""
                }
            };
        },

        mounted: function() {
            this.$axios.get("/report").then(response => {
                this.rideInfo = response.data.map(rideInformation => ({
                    date: rideInformation.date,
                    time: rideInformation.time,
                    distance: rideInformation.distance,
                    fuelPrice: rideInformation.fuelPrice,
                    fee: rideInformation.fee,
                    vehicleId: rideInformation.vehicleId,
                    fromLocationId: rideInformation.fromLocationId,
                    toLocationId: rideInformation.toLocationId,
                    passengers: rideInformation.passengers,
                    driver: rideInformation.driver

                }));
            });
        },

        methods: {
            // Display a snackbar message.
            showSnackbar(text) {
                this.snackbar.text = text;
                this.snackbar.show = true;
            },

            itemClass(item) {
                const currentAccount = this.$store.state.currentAccount;
                if (currentAccount && currentAccount.id === item.id) {
                    return "currentAccount";
                }
            },

        }
    };
</script>

<style>
    .currentAccount {
        background: lightcoral;
    }
</style>