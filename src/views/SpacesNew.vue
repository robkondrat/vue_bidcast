<template>
  <div class="spaces-create">
    <div class="container">
      <form v-on:submit.prevent="createSpace()">
        <h1 class="subtitle">New Space</h1>

        <div>
          <li v-for="error in errors">{{ error }}</li>
        </div>

        <table align="center">
          <tr>
            <td><label>Length (in seconds):</label></td>
            <select id="length" v-model="length">
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="120">120</option>
              <option value="150">150</option>
              <option value="180">180</option>
              <option value="210">210</option>
            </select>
          </tr>

          <td>
            <td></td>
            <td><input type="submit" value="Create Space"></td>
          </td>
        </table>
      </form>
    </div>

  </div>
</template>

<script>
  var axios = require("axios");

  export default {
    data: function() {
      return {
        length: "",
        active: true,
        podcast_id: "",
        errors: []
      };
    },
    // created: function() {
    //   this.podcast_id = this.$route.query.podcast_id;

    // },
    methods: {
      createSpace: function() {

        var params = {
          length: this.length,
          active: true
        }

        axios.post("/api/spaces", params)
          .then(response => {
            this.$router
            .push("/podcasts/" + response.data.podcast.id );
          })
          .catch(error => console.log(error.response));
      }
    }
  }
</script>