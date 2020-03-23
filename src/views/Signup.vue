<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="createUser()">
        <h1 class="subtitle">Signup</h1>

        <div>
          <p>Welcome to Bidcast!</p>
        </div>

        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <table align="center">

          <tr>
            <td>Name:</td>
            <td><input type="text" v-model="name"></td>
          </tr>

          <tr>
            <td>Description:</td>
            <td><input type="text" v-model="description"></td>
          </tr>

          <tr>
            <td>Image:</td>
            <td><input type="file" v-on:change="setFile($event)" ref="fileInput"></td>

          </tr>

          <tr>
            <td>YouTube URL:</td>
            <td><input type="text" v-model="youtubeUrl"></td>
          </tr>

          <tr>
            <td>Email:</td>
            <td><input type="text" v-model="email"></td>
          </tr>

          <tr>
            <td>Password:</td>
            <td><input type="password" v-model="password"></td>
          </tr>

          <tr>
            <td>Password Confirmation:</td>
            <td><input type="password" v-model="passwordConfirmation"></td>
          </tr>

          <tr>
            <td>Podcast or Advertiser?</td>
            <td>
              <input type="radio" v-model="type" value="Podcast"> Podcast 
              <input type="radio" v-model="type" value="Advertiser"> Advertiser</td>
          </tr>

          <tr>
            <td></td>
            <td><input type="submit" value="Signup"></td>
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
        name: "", 
        description: "",
        image: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        type: "",
        youtubeUrl: "",
        errors: []
      };
    },
    created: function() {},
    methods: {
      setFile: function(event) {
        if (event.target.files.length > 0) {
          this.image = event.target.files[0];
        }
      },

      createUser: function() {
        var formData = new FormData();
          formData.append("name", this.name);
          formData.append("description", this.description);
          formData.append("image", this.image);
          formData.append("youtubeUrl", this.youtubeUrl);
          formData.append("email", this.email);
          formData.append("password", this.password);
          formData.append("passwordConfirmation", this.passwordConfirmation);
          formData.append("type", this.type);

        axios
        .post("http://localhost:3000/api/users", formData)
        .then(response => {
          this.$router.push("/login");
        }).catch(error => {
          this.errors = error.response.data.errors;
        });
        
      }
    }
  };
</script>
