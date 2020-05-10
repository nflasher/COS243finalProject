<template>

    <div class="my-2">
        <h2 class="h2 text-center blue--text"><strong>Passenger page</strong></h2>
        <div class="my-2">
            <div class="my-2">
                <v-btn outlined v-bind:to="{ name: 'signUpPassenger' }">
                    Sign Up as Passenger
                </v-btn>
            </div>
            <v-btn outlined v-bind:to="{ name: 'registerRide' }">
                Register for a ride
            </v-btn>
        </div>
        <div class="my-2">
            <v-btn outlined v-bind:to="{ name: 'seeRides' }">
                See all of your rides
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