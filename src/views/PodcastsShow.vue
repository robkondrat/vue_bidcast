<template>
  <div class="podcasts-show">
    <div class="container">

      <h1>{{ podcast.name }}</h1>
        <div>
          <h2>Description: {{ podcast.description }}</h2>
          <h2>Email: {{ podcast.email }}</h2>
          <h2><router-link v-bind:to="'/spaces/new'">New Space</router-link></h2>
          <h2><router-link v-bind:to="'/users/' + podcast.id + '/edit'" v-if="$parent.podcastId">Update Podcast</router-link></h2>


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
        podcast: {
          name: "",
          description: "",
          image: "",
          email: "",
          id: ""
        }
      };
    },
    created: function() {
      axios
      .get("/api/podcasts/" + this.$route.params.id)
      .then(response => {
        this.podcast = response.data;
      });

      axios
        .get("/api/users")
        .then(response => {
          this.user = response.data;
        });
    },
    methods: {
      destroyMarker: function() {
        axios
          .delete("api/podcasts" + this.$route.params.id)
          .then(response => {
            this.$router.push("/")
          });
      }
    }
  }
</script>