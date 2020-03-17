<template>
  <div id="app">

    <nav class="navbar navbar-white navbar-expand-lg fixed-top">
        <div class="container">
            <div class="navbar-logo">
                <a href="/"><img src="/assets/img/logo.png" alt="Ecada Logo" /></a>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars">TEST</i>
            </button>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav ml-auto">
                    <li><router-link to="/podcasts">Podcasts</router-link></li>
                    <li><router-link v-bind:to="'/podcasts/' + podcastId" v-if="podcastId">Podcast Home</router-link></li>

                    <li><router-link v-bind:to="'/advertisers/' + advertiserId" v-if="advertiserId">Advertiser Home</router-link></li>

                    <li><router-link to="/login">Login</router-link></li>

                    <li><router-link to="/logout">Logout</router-link></li>

                </ul>
            </div>
        </div>
    </nav>

    <main>
      <router-view/>
    </main>

    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <a href="index.html"><img src="/assets/img/logo.png" alt="Footer Logo"/></a>
                </div>
                <div class="footer-social">
                    <a target="_blank" href="https://www.facebook.com/encodeslife/"><i class="fa fa-facebook"></i></a>
                    <a target="_blank" href="https://twitter.com/encodeslife"><i class="fa fa-twitter"></i></a>
                </div>
            </div>
            <div class="subfooter">
                <p>Ecada © 2019 - All rights reserved</p>
                <p>Made with <i class="fa fa-heart"></i> by <a target="_blank" href="http://encodeslife.com/">Encodeslife</a></p>
                <div class="clearfix"></div>
            </div>
        </div>
    </footer>



  </div>
</template>

<style>
main {
  margin: 120px 0px;
}
</style>

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
