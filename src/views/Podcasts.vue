<template>
  <div class="podcasts-index">
    <div class="container">

      <h1>Podcasts</h1>
      <div v-for="podcast in podcasts">
        <div>
          <h2>Name: <router-link v-bind:to="'/podcasts/' + podcast.id">{{ podcast.name }}</router-link></h2>
          <h2>Description: {{ podcast.description }}</h2>
          <h2>Email: {{ podcast.email }}</h2>
          <h2><td><router-link v-bind:to="'/users/' + podcast.id + '/edit'">Update</router-link></td></h2>

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
        podcasts: [],
      };
    },
    created: function() {
      axios
      .get("/api/podcasts")
      .then(response => {
        this.podcasts = response.data;
      });
    },
    methods: {}
  }
</script>