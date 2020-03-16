<template>
  <div class="advertisers-show">
    <div class="container">

      <h1>{{ advertiser.name }}</h1>
        <div>
<!--           <h2>Description: {{ advertiser.description }}</h2>
          <h2>Email: {{ advertiser.email }}</h2> -->
          <table>
            <thead>
              <th>Podcast Name</th>
              <th>Your Bid</th>
              <th>Winning?</th>
              <th>Highest Bid</th>
              <th>Time Left</th>
            </thead>
            <tbody>

              <!-- <tr v-for="bid in bids">
                <td><router-link v-bind:to="'/advertiser/' + advertiser.id">{{ advertiser.bid.space.podcast.name }}</router-link></td>
                <td>{{ advertiser.bid.price }} sec.</td>
                <td>{{ space.active }}</td>
                <td>coming soon</td>
                <td><router-link v-bind:to="'/bids/new?space_id=' + space.id ">Place Bid</router-link></td>
              </tr> -->
            </tbody>
          </table>
          <h2><td><router-link v-bind:to="'/users/' + advertiser.id + '/edit'">Update Profile</router-link></td></h2>

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
    methods: {}
  }
</script>