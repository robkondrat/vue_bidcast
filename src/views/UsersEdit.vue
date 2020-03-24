<template>
  <div class="users-edit">
    <div class="container">
      <form v-on:submit.prevent="updateUser()">
        <h1 class="subtitle">Update Profile</h1>

        <div v-for="error in errors">{{ error }}</div>

        <table align="center">
          
          <tr>
            <td><label>Name:</label></td>
            <td><input type="text" v-model="user.name"></td>
          </tr>

          <tr>
            <td><label>Description:</label></td>
            <td><input type="textarea" v-model="user.description"></td>
          </tr>

          <tr>
            <td><label>Email:</label></td>
            <td><input type="text" v-model="user.email"></td>
          </tr>

          <tr>
            <td><label>YouTube URL:</label></td>
            <td><input type="text" v-model="user.youtubeUrl"></td>
          </tr>

<!--           <tr>
            <td>Image:</td>
            <td><input type="file" v-on:change="setFile($event)" ref="fileInput"></td>
          </tr> -->

          <tr>
            <td></td>
            <td><input class="btn btn-primary" type="submit" value="Edit User"></td>
          </tr>

          <tr>
            <td></td>
            <td><button class="btn btn-primary" @click="deleteProfile()">Delete Profile</button></td>
          </tr>

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
        user: {
          name: "",
          description: "",
          email: "",
          youtubeUrl: ""
          // image: ""
        },
        errors: []
      };
    },
    created: function() {
      axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        this.user = response.data;
      });
    },
    methods: {
      // setFile: function(event) {
      //   if (event.target.files.length > 0) {
      //     this.image = event.target.files[0];
      //   }
      // },
      updateUser: function() {
        var formData = new FormData();
          formData.append("name", this.user.name);
          formData.append("description", this.user.description);
          formData.append("email", this.user.email);
          formData.append("youtube_url", this.user.youtubeUrl);
          // formData.append("image", this.user.image);


        axios
        .patch("/api/users/" + this.$route.params.id, formData)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
      },
      deleteProfile: function() {
        if (this.user.type === "Podcast") {
          axios
            .delete("api/podcasts/" + this.$route.params.id)
            .then(response => {
              this.$router.push("/")
            });
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("jwt");

            this.$parent.podcastId = "";
            localStorage.removeItem("podcastId");
            this.$parent.advertiserId = "";
            localStorage.removeItem("advertiserId");
            this.$router.push("/");
        }else {
          axios
            .delete("api/advertisers/" + this.$route.params.id)
            .then(response => {
              this.$router.push("/")
            });
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("jwt");

            this.$parent.podcastId = "";
            localStorage.removeItem("podcastId");
            this.$parent.advertiserId = "";
            localStorage.removeItem("advertiserId");
            this.$router.push("/");
        };

      }
    }
  };
</script>