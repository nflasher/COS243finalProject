<template>

    <div class="my-2">
        <h2 class="h2 text-center blue--text"><strong>Driver page</strong></h2>
        <div class="my-2">
            <v-btn outlined v-bind:to="{ name: 'signUpDriver' }">
                Sign up as Driver
            </v-btn>
        </div>
        <div class="my-2">
            <v-btn outlined v-bind:to="{ name: 'registerToDrive' }">
                Register to drive
            </v-btn>
        </div>
        <div class="my-2">
            <v-btn outlined v-bind:to="{ name: 'seeRides' }">
                See all of your drives
            </v-btn>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Passenger.vue"
    }
</script>

<style scoped>

</style>