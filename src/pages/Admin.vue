<template>

    <div class="my-2">
        <h2 class="h2 text-center blue--text"><strong>Admin page</strong></h2>
        <div class="my-2">
        <v-btn outlined v-bind:to="{ name: 'addVehicle' }">
            Add Vehicle
        </v-btn>
        <v-btn outlined v-bind:to="{ name: 'updateVehicle' }">
        Update Vehicle
        </v-btn>
        </div>
        <div class="my-2">
        <v-btn outlined v-bind:to="{ name: 'addVehicleType' }">
            Add Vehicle Type
        </v-btn>
        </div>
        <div class="my-2">
        <v-btn outlined v-bind:to="{ name: 'addRide' }">
            Add Ride
        </v-btn>
        <v-btn outlined v-bind:to="{ name: 'updateRide' }">
            Update Ride
        </v-btn>
        </div>
        <div class="my-2">
        <v-btn outlined v-bind:to="{ name: 'authorizeDriver' }">
            Authorize Driver
        </v-btn>
        </div>
        <div class="my-2">
        <v-btn outlined v-bind:to="{ name: 'getReport' }">
            Get report of all rides with their passengers and drivers
        </v-btn>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Admin.vue"
    }
</script>

<style scoped>

</style>