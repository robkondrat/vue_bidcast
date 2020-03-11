<template>
  <div class="podcasts-index">
    <div class="container">
      <div v-for="podcast in podcasts">
        <div>
          <h2>Name:</h2>
          <h3>{{ podcast.name }}</h3>
          <h2>Description:</h2>
          <h3>{{ podcast.description }}</h3>
          <h2>{{ podcast.email }}</h2>
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