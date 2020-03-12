<template>
  <div class="advertisers-show">
    <div class="container">

      <h1>{{ advertiser.name }}</h1>
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
        advertiser: {
          name: "",
          description: "",
          image: "",
          email: ""
        }
      };
    },
    created: function() {
      axios
      .get("/api/advertisers/" + this.$route.params.id)
      .then(response => {
        this.advertiser = response.data;
      });
    },
    methods: {}
  }
</script>