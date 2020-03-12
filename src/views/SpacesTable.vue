<template>
  <div class="spaces-table">
    <h1>Bidcast</h1>

    <table>
      <thead>
        <th>Podcast Name</th>
        <th>Length</th>
        <th>Active</th>
        <th>Time Left</th>
        <th>Update</th>
      </thead>
      <tbody>

        <tr v-for="space in spaces">
          <td><router-link v-bind:to="'/podcasts/' + space.podcast.id">{{ space.podcast.name }}</router-link></td>
          <td>{{ space.length }} sec.</td>
          <td>{{ space.active }}</td>
          <td>coming soon</td>
          <td><a href="/bids/new">Place Bid</a></td>
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
  }
}
  
</script>