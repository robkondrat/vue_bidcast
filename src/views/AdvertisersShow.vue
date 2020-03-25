<template>
  <div class="advertisers-show">
    <div class="container">

      <h1>{{ advertiser.name }}</h1>
        <div>
          <img :src="advertiser.image_url" width=300>
          <h2>Description: {{ advertiser.description }}</h2>
          <h2>Email: {{ advertiser.email }}</h2>
          <iframe v-if="advertiser.youtube_url" width="560" height="315" :src="advertiser.youtube_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <div v-if="$parent.advertiserId">
            <table align="center">
              <thead>
                <th>Podcast Name</th>
                <th>Space ID</th>
                <th>Your Bid</th>
                <th>Winning?</th>
                <th>Highest Bid</th>
                <th>Deadline (CST)</th>
                <th>New Bid</th>
              </thead>
              <tbody>

                <tr v-for="bid in advertiser.bids">
                  <td><router-link v-bind:to="'/podcasts/' + bid.space.podcast_id">{{ bid.space.podcast.name }}</router-link></td>
                  <td>{{ bid.space.id }}</td>
                  <td>{{ bid.price }}</td>
                  <td>{{winning(bid.price, bid.space.highest_bid)}}</td>
                  <td>{{ bid.space.highest_bid }}</td>
                  <td>{{ bid.space.deadline }}</td>

                  <td><router-link type="button" class="btn btn-outline-light" v-bind:to="'/bids/new?space_id=' + bid.space.id ">Place Bid</router-link></td>
                </tr>
              </tbody>
            </table>
            <h4><router-link type="button" class="btn btn-outline-primary" v-bind:to="'/users/' + advertiser.id + '/edit'" v-if="$parent.advertiserId">Update Profile</router-link></h4>
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
          youtubeUrl: "",
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