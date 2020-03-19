<template>
  <div class="advertisers-show">
    <div class="container">

      <h1>{{ advertiser.name }}</h1>
        <div>
          <h2>Description: {{ advertiser.description }}</h2>
          <h2>Email: {{ advertiser.email }}</h2>
          <div v-if="$parent.advertiserId">
            <table>
              <thead>
                <th>Podcast Name</th>
                <th>Space ID</th>
                <th>Your Bid</th>
                <th>Winning?</th>
                <th>Highest Bid</th>
                <th>Time Left</th>
                <th>New Bid</th>
              </thead>
              <tbody>

                <tr v-for="bid in advertiser.bids">
                  <td><router-link v-bind:to="'/podcast/' + bid.space.podcast_id">{{ bid.space.podcast.name }}</router-link></td>
                  <td>{{ bid.space.id }}</td>
                  <td>{{ bid.price }}</td>
                  <td>{{winning(bid.price, bid.space.highest_bid)}}</td>
                  <td>{{ bid.space.highest_bid }}</td>
                  <td>{{ bid.space.time_left }}</td>

                  <td><router-link v-bind:to="'/bids/new?space_id=' + bid.space.id ">Place Bid</router-link></td>
                </tr>
              </tbody>
            </table>
            <h2><td><router-link v-bind:to="'/users/' + advertiser.id + '/edit'" v-if="$parent.advertiserId">Update Profile</router-link></td></h2>
          </div>
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
          email: "",
          bids: []
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
    methods: {
      winning: function(userBid, winningBid) {
        if (userBid === winningBid) {
          return "Yes";
        } else {
          return "No";
        };
      }
    }
  }
</script>