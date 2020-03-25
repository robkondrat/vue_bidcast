<template>
  <div class="podcasts-show">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1>{{ podcast.name }}</h1>
          <img class="avatar" :src="podcast.image_url" width=300>
          <div>
            <h3><a href="mailto:'podcast.email'">{{ podcast.email }}</a></h3>
          </div>
        </div>
        <div class="col-md-6">
          <h3>{{ podcast.description }}</h3>

          <iframe v-if="podcast.youtube_url" width="560" height="315" align="center" :src="podcast.youtube_url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>


      <div class="row">
        <div class="col-md-6">
          <div v-if="$parent.podcastId === podcast.id " align=center><h2>Closed Spaces</h2></div>
          <table v-if="$parent.podcastId === podcast.id" class="table table-light" align=center>
            <thead>

              <th>Advertiser</th>
              <th>Length</th>
              <th>Winning Bid</th>
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
              <th>Current Price</th>
              <th>Deadline (CST)</th>
              <th></th>
            </thead>
            <tbody>

              <tr v-for="space in podcast.spaces" v-if="space.active">

                <td><router-link v-bind:to="'/advertisers/' + space.winning_advertiser_id">{{ space.winning_advertiser }}</router-link></td>
                <td>{{ space.length }} sec.</td>
                <td>{{ space.highest_bid }}</td>
                <td>{{space.deadline}}</td>
                <td><router-link type="button" class="btn btn-outline-light" v-if="$parent.advertiserId" v-bind:to="'/bids/new?space_id=' + space.id ">Place Bid</router-link></td>
              </tr>
            </tbody>
          </table>

          <h5><router-link class="btn btn-light" v-bind:to="'/spaces/new'" v-if="$parent.podcastId">New Space</router-link></h5>

          <h5><router-link class="btn btn-primary" v-bind:to="'/users/' + podcast.id + '/edit'" v-if="$parent.podcastId">Update Podcast</router-link></h5>
        </div>

        <div class="col-md-6">
              
            <div>
              <h1>New Message</h1>
              <form v-on:submit.prevent="createMessage()">
                <div class="form-group">
                  <input class="form-control" type="text" v-model="newMessageBody">
                  </input>
                </div>
                  <input class="btn btn-primary" type="submit" value="Send Message"></input>
              </form>
            </div>
            <div>
              <h1>All Messages</h1>
              <div class="jumbotron mt-1 py-2" id="podcast-message" v-for="message in messages" v-if="message.user_type === 'Podcast'">
                <p class="lead"><strong>{{message.name}}</strong> : {{ message.created_at }}</p>
                <p>{{ message.body }}</p>
              </div>

              <div class="jumbotron mt-1 py-2" id="advertiser-message" v-for="message in messages" v-if="message.user_type === 'Advertiser'">
                <p class="lead"><strong>{{message.name}}</strong> : {{ message.created_at }}</p>
                <p>{{ message.body }}</p>
              </div>

<!--               <div class="jumbotron mt-1 py-2" v-for="message in messages" v-if="message.user.id === $parent.advertiserId">
                <p class="lead"><strong>{{message.name}}</strong> : {{ message.created_at }}</p>
                <p>{{ message.body }}</p>
              </div> -->
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
        advertiser: {
          name: "",
          email: "",
          id: ""
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