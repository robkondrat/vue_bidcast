<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Bidcast</router-link> |
      <router-link to="/podcasts">Podcasts</router-link>
      |

      <router-link v-bind:to="'/podcasts/' + podcastId" v-if="podcastId">Podcast Home</router-link>

      <router-link v-bind:to="'/advertisers/' + advertiserId" v-if="advertiserId">Advertiser Home</router-link>
      <!-- <div class="podcast-home">
        <router-link to="'/podcasts/' + podcast.id">Profile</router-link>
      </div>

      <div class="advertiser-home">
        <router-link to="'/advertisers/' + advertiser.id">Profile</router-link>
      </div> -->
      |
      <router-link to="/signup">Signup</router-link>
      |
      <router-link to="/login">Login</router-link>
      |
      <router-link to="/logout">Logout</router-link>


    </div>
    <router-view/>
  </div>
</template>

<script>
  var axios = require('axios');

  export default {
    data: function() {
      return {
        podcastId: "",
        advertiserId: "",
        podcasts: [],
        advertisers: []
      };
    },

    created: function() {
      var podcastId = localStorage.getItem("podcastId");
      if (podcastId) {
        this.podcastId = podcastId;
      };
      

      var advertiserId = localStorage.getItem("advertiserId");
      if (advertiserId) {
        this.advertiserId = advertiserId;
      }

      axios
        .get("/api/users")
        .then(response => {
          this.user = response.data;
        });
    }
  }

</script>

<style>

/*div.podcast-home, div.advertisers-home {
  display.none;
}*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
