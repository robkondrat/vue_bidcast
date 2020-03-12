<template>
  <div class="users-edit">
    <div class="container">
      <form v-on:submit.prevent="updateUser()">
        <h1 class="subtitle">Edit User</h1>

        <div v-for="error in errors">{{ error }}</div>

        <table align="center">
          
          <tr>
            <td><label>Name:</label></td>
            <td><input type="text" v-model="user.name"></td>
          </tr>

          <tr>
            <td><label>Description:</label></td>
            <td><input type="text" v-model="user.description"></td>
          </tr>

          <tr>
            <td><label>Email:</label></td>
            <td><input type="text" v-model="user.email"></td>
          </tr>

          <tr>
            <td><label>Image:</label></td>
            <!-- <td><input type="text" v-model="user.name"></td> -->
          </tr>

          <tr>
            <td></td>
            <td><input type="submit" value="Edit User"></td>
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
          email: ""
          // image: ""
        },
      errors: []
      };
    },
    created: function() {
      axios
      .get("/api/users/" + this.$route.params.id)
      .then(response => {
        this.user = error.response.data.errors;
      });
    }
  }
</script>