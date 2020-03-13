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
            <td><input type="text" v-model="length"></td>
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
        // podcast_id: "",
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
          // space_id: this.space_id
        }

        axios.post("/api/spaces", params).then(response => {
          this.$router.push("/podcasts/" + response.data.podcast.id );
        }).catch(error => console.log(error.response));
      }
    }
  }
</script>