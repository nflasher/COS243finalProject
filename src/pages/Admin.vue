<template>
    <div>
        <header>
            Admin Page
        </header>
        <v-btn text v-bind:to="{ name: 'addVehicle' }">
            Add Vehicle
        </v-btn>
        <v-btn text v-bind:to="{ name: 'updateVehicle' }">
            Update Vehicle
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