<template>
    <div>
        <header>
            Admin Page
        </header>
        <v-btn text v-bind:to="{ name: 'addUpdateVehicle' }">
            Add or Update a Vehicle
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