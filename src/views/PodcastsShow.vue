<template>
  <div class="podcasts-show">
    <div class="container">

      <h1>{{ podcast.name }}</h1>
        <div>
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
        podcast: {
          name: "",
          description: "",
          image: "",
          email: ""
        }
      };
    },
    created: function() {
      axios
      .get("/api/podcasts/" + this.$route.params.id)
      .then(response => {
        this.podcast = response.data;
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