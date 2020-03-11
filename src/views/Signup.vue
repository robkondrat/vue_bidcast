<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1 class="subtitle">Signup</h1>

        <div>
          <p>Welcome to Bidcast!</p>
        </div>

        <ul>
          <li v-for="error in errors">{{ error }}</li>
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
            <td>image coming soon</td>
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
  import axios from "axios";

  export default {
    data: function() {
      return {
        name: "", 
        description: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        type: "",
        errors: []
      };
    },
    methods: {
      submit: function() {
        var params = {
          name: this.name,
          description: this.description,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          type: this.type
        };
        axios
        .post("api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
      }
    }
  };
</script>