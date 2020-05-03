<template>
    <div class="my-2">
        <header>
            Admin Page
        </header>
        <v-btn text v-bind:to="{ name: 'addVehicle' }">
            Add Vehicle
        </v-btn>
        <v-btn text v-bind:to="{ name: 'updateVehicle' }">
        Update Vehicle
        </v-btn>
        <v-btn text v-bind:to="{ name: 'addVehicleType' }">
            Add Vehicle Type
        </v-btn>
    </div>

</template>

<script>
    export default {
        name: "Admin.vue"
    }
</script>

<style scoped>

</style>