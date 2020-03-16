<template>
  <div class="podcasts-show">
    <div class="container">

      <h1>{{ podcast.name }}</h1>
        <div>
          <h2>Description: {{ podcast.description }}</h2>
          <h2>Email: {{ podcast.email }}</h2>
          <div>

          </div>
          <table>
            <thead>
              <th>Id</th>
              <th>Length</th>
              <th>Price</th>
              <th>Time Left</th>
              <th>Update</th>
            </thead>
            <tbody>

<!--               <tr v-for="podcast.space in podcast.spaces">
                <td><router-link v-bind:to="'/spaces/' + podcast.space.id">{{ space.id }}</router-link></td>
                <td>{{ space.length }} sec.</td>
                <td>{{ space.bid.price.max }}</td>
                <td>coming soon</td>
                <td><router-link v-bind:to="'/bids/new?space_id=' + space.id ">Place Bid</router-link></td>
              </tr> -->
            </tbody>
          </table>
          <h2><router-link v-bind:to="'/spaces/new'" v-if="$parent.podcastId">New Space</router-link></h2>
          <h2><router-link v-bind:to="'/users/' + podcast.id + '/edit'" v-if="$parent.podcastId">Update Podcast</router-link></h2>


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
        this.podcast = response.data;
      });

      axios
        .get("/api/users")
        .then(response => {
          this.user = response.data;
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