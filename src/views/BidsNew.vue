<template>
  <div class="bids-create">
    <div class="container">
      <form v-on:submit.prevent="createBid()">
        <h1 class="subtitle">New Bid</h1>

        <div>
          <li v-for="error in errors">{{ error }}</li>
        </div>

        <table align="center">
          <tr>
            <td><label>Price:</label></td>
            <td><input type="number" v-model="price"></td>
          </tr>

          <td>
            <td></td>
            <td><input type="submit" value="Place Bid"></td>
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
        price: "",
        space_id: "",
        errors: []
      };
    },
    created: function() {
      this.space_id = this.$route.query.space_id;

    },
    methods: {
      createBid: function() {

        var params = {
          price: this.price,
          space_id: this.space_id
        }

        axios.post("/api/bids", params).then(response => {
          this.$router.push("/podcasts/" + response.data.space.podcast.id );
        }).catch(error => console.log(error.response));
      }
    }
  }
</script>

