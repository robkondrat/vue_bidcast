<template>
  <div class="podcasts-show">
    <div class="container">

      <h1>{{ podcast.name }}</h1>
        <div>
          <img :src="podcast.image_url" width=300>
          <h5>Description: {{ podcast.description }}</h5>
          <h5>Email: {{ podcast.email }}</h5>

          <iframe v-if="podcast.youtube_url" width="560" height="315" align="center" :src="podcast.youtube_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <div>

          </div>

          <div v-if="$parent.podcastId === podcast.id" align=center><h2>Closed Spaces</h2></div>
          <table v-if="$parent.podcastId === podcast.id" align=center>
            <thead>

              <th>Advertiser</th>
              <th>Length</th>
              <th>Price</th>
            </thead>
            <tbody>

              <tr v-for="space in podcast.spaces" v-if="!space.active" >

                <td><router-link v-bind:to="'/advertisers/' + space.winning_advertiser_id">{{ space.winning_advertiser }}</router-link>
                <td>{{ space.length }} sec.</td>
                <td>{{ space.highest_bid }}</td>

              </tr>
            </tbody>
          </table>

          <h2 align=center>Active Spaces</h2>
          <table class="table table-dark" align=center>
            <thead>

              <th>Advertiser</th>
              <th>Length</th>
              <th>Price</th>
              <th>Deadline (CST)</th>
              <th></th>
            </thead>
            <tbody>

              <tr v-for="space in podcast.spaces" v-if="space.active">

                <td><router-link v-bind:to="'/advertisers/' + space.winning_advertiser_id">{{ space.winning_advertiser }}</router-link></td>
                <td>{{ space.length }} sec.</td>
                <td>{{ space.highest_bid }}</td>
                <td>{{space.deadline}}</td>
                <td><router-link v-if="$parent.advertiserId" v-bind:to="'/bids/new?space_id=' + space.id ">Place Bid</router-link></td>
              </tr>
            </tbody>
          </table>

          <h5><router-link v-bind:to="'/spaces/new'" v-if="$parent.podcastId">New Space</router-link></h5>

          <h5><router-link v-bind:to="'/users/' + podcast.id + '/edit'" v-if="$parent.podcastId">Update Podcast</router-link></h5>
            
          <div class="row">
            <div class="col-md-4 offset-md-1">
              <h1>New Message</h1>
              <form v-on:submit.prevent="createMessage()">
                <div class="form-group">
                  <input class="form-control" type="text" v-model="newMessageBody">
                  </input>
                </div>
                  <input class="btn btn-primary" type="submit" value="Send Message"></input>
              </form>
            </div>
            <div class="col-md-6 offset-md-1 mt-md-0 mt-5">
              <h1>All Messages</h1>
              <div class="jumbotron mt-1 py-2" v-for="message in messages">
                <p class="lead"><strong>{{message.name}}</strong> : {{ message.created_at }}</p>
                <p>{{ message.body }}</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var axios = require("axios");
  import ActionCable from "actioncable";
  import { getIdFromURL } from 'vue-youtube-embed';




  export default {
    data: function() {
      return {
        podcast: {
          name: "",
          description: "",
          image: "",
          email: "",
          spaces: [],
          id: "",
          youtubeUrl: ""
        },
        messages: [],
        newMessageBody: "",
      };
    },
    created: function() {
      axios.get("/api/messages/").then(response => {
        this.messages = response.data;
      });
      axios
      .get("/api/podcasts/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.podcast = response.data;
      });




      var cable = ActionCable.createConsumer("ws://localhost:3000/cable");

      cable.subscriptions.create("MessageRoomChannel", {
        connected: () => {
          // Called when the subscription is ready for use on the server
          console.log("Connected to MessageRoomChannel");
        },
        disconnected: () => {
          // Called when the subscription has been terminated by the server
        },
        received: data => {
          // Called when there's incoming data on the websocket for this channel
          console.log("Data from MessageRoomChannel:", data);
          this.messages.unshift(data); // update the messages in real time
        }
      });

      cable.subscriptions.create("SpacesChannel", {
        connected: () => {
          // Called when the subscription is ready for use on the server
          console.log("Connected to SpacesChannel");
        },
        disconnected: () => {
          // Called when the subscription has been terminated by the server
          console.log("Disconnected from SpacesChannel");
        },
        received: data => {
          // Called when there's incoming data on the websocket for this channel
          console.log("Data from SpacesChannel:", data);
          this.podcast.spaces = data;
          // this.podcast.spaces.unshift(data); // update the messages in real time
        }
      });
    },
    methods: {
      // getYoutubeUrl: function(youtubeUrl) {
      //   this.videoId = this.$youtube.getIdFromURL(youtubeUrl)
      // },

      createMessage: function() {
        var params = {
          body: this.newMessageBody
        };

        axios.post("/api/messages", params).then(response => {
          this.newMessageBody = "";
          this.messages.unshift(response.data);
        });
      },
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