<template>
  <div class="login">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1 class="subtitle">Login</h1>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>

        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>

        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>

        <input type="submit" value="Login">
      </form>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: function() {
      return {
        email: "",
        password: "",
        errors: []
      };
    },
    methods: {
      submit: function() {
        var params = {
          email: this.email,
          password: this.password
        };
        axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);

          if (response.data.type == "Podcast") {
            this.$parent.podcastId = response.data.user_id;
            localStorage.setItem("podcastId", response.data.user_id);
            this.$router.push("/podcasts/" + response.data.user_id);
            this.$parent.advertiserId = "";
            localStorage.removeItem("advertiserId");
          }

          if (response.data.type == "Advertiser") {
            this.$parent.advertiserId = response.data.user_id;
            localStorage.setItem("advertiserId", response.data.user_id);
            this.$router.push("/");
            this.$parent.podcastId = "";
            localStorage.removeItem("podcastId");

          }
        })
        .catch(error => {
          this.errors = ["invalid email or password."];
          this.email = "",
          this.password = "";
        });
      }
    }

  }
</script>