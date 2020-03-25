<template>
  <div class="spaces-table">
    <img src="/bidcast-logo.png" width=450>

    <table align=center>
      <thead>
        <th>Podcast Name</th>
        <th>Length</th>

        <th>Deadline (CST)</th>
        <th>Highest Bid</th>
      </thead>
      <tbody>

        <tr v-if="space.active" v-for="space in spaces">
          <td><router-link v-bind:to="'/podcasts/' + space.podcast.id">{{ space.podcast.name }}</router-link></td>
          <td>{{ space.length }} sec.</td>

          <td>{{ space.deadline }}</td>
          <td>{{ space.highest_bid }}</td>
          <td ><router-link type="button" class="btn btn-outline-light" v-bind:to="'/bids/new?space_id=' + space.id ">Place Bid</router-link></td>

        </tr>
      </tbody>
    </table>
  </div>
</template>



<script>
var axios = require("axios")

export default {
  data: function() {
    return {
      spaces: []
    };
  },
  created: function() {
    axios
    .get("/api/spaces")
    .then(response => {
      this.spaces = response.data;
    });
  }, 
  methods: {
  }
  
}
  
</script>