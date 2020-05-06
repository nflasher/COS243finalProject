<template>
  <v-container>
    <div>
      <h4 class="display-1">Welcome, to ride share!</h4>

      <p class="body-1">This is our award-winning home page. by Nate and Connor</p>
    </div>

    <div>
      <v-btn v-if="isLoggedIn" text v-bind:to="{ name: 'admin' }">
        Admin
      </v-btn>

    </div>
  </v-container>
</template>

<script>
  export default {
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      }
    },
  };
</script>
