<template>
  <div class="advertisers-show">
    <div class="container">

      <h1>{{ advertiser.name }}</h1>
      <div v-for="advertiser in advertisers">
        <div>
          <h2>Description: {{ advertiser.description }}</h2>
          <h2>Email: {{ advertiser.email }}</h2>
          <h2><td><router-link v-bind:to="'/users/' + advertiser.id + '/edit'">Update</router-link></td></h2>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        advertisers: [],
      };
    },
    created: function() {
      axios
      .get("/api/advertisers")
      .then(response => {
        this.advertisers = response.data;
      });
    },
    methods: {}
  }
</script>