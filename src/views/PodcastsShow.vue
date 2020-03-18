<template>
  <div class="podcasts-show">
    <div class="container">

      <h1>{{ podcast.name }}</h1>
        <div>
          <img :src="podcast.image_url" width=300>
          <h5>Description: {{ podcast.description }}</h5>
          <h5>Email: {{ podcast.email }}</h5>
          <div>

          </div>

          <div align=center><h2>Closed Spaces</h2></div>
          <table align=center>
            <thead>
              <th>Id</th>
              <th>Advertiser</th>
              <th>Length</th>
              <th>Price</th>
            </thead>
            <tbody v-if="$parent.podcastId">

              <tr v-if="!space.active" v-for="space in podcast.spaces">
                <td>{{ space.id }}</td>
                <td>{{ space.winning_advertiser }}</td>
                <td>{{ space.length }} sec.</td>
                <td>{{ space.highest_bid }}</td>

              </tr>
            </tbody>
          </table>

          <h2 align=center>Active Spaces</h2>
          <table align=center>
            <thead>
              <th>Id</th>
              <th>Advertiser</th>
              <th>Length</th>
              <th>Price</th>
              <th>Deadline (CST)</th>
              <th></th>
            </thead>
            <tbody>

              <tr v-if="space.active" v-for="space in podcast.spaces">
                <td><router-link v-bind:to="'/spaces/' + space.id">{{ space.id }}</router-link></td>
                <td>{{ space.winning_advertiser }}</td>
                <td>{{ space.length }} sec.</td>
                <td>{{ space.highest_bid }}</td>
                <td>{{space.deadline}}</td>
                <td><router-link v-bind:to="'/bids/new?space_id=' + space.id ">Place Bid</router-link></td>
              </tr>
            </tbody>
          </table>

          <h5><router-link v-bind:to="'/spaces/new'" v-if="$parent.podcastId">New Space</router-link></h5>



          
          <h5><router-link v-bind:to="'/users/' + podcast.id + '/edit'" v-if="$parent.podcastId">Update Podcast</router-link></h5>


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
        podcast: {
          name: "",
          description: "",
          image: "",
          email: "",
          spaces: [],
          id: ""
        }
      };
    },
    created: function() {
      axios
      .get("/api/podcasts/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.podcast = response.data;
      });

    },
    methods: {
      destroyPodcast: function() {
        axios
          .delete("api/podcasts" + this.$route.params.id)
          .then(response => {
            this.$router.push("/")
          });
      }
    }
  }
</script>