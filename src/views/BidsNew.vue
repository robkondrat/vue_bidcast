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
            <td><input type="text" v-model="bid.price"></td>
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
        bid: {
          price: ""
        }, 
      errors: []
      };
    },
    created: function() {},
    methods: {
      createBid: function() {
        let params = {
          price: this.price
        }

        axios.post("/api/bids", params).then(response => {
          this.bids.push(response.data);
        }).catch(error => console.log(error.response));
      }
    }
  }
</script>

