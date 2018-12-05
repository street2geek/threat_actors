<template>
    <div class="wrapper">
        <form class="loginform">
            <fieldset>
                <label for="nameField">User Name</label>
                <input type="text" placeholder="Enter Username" id="nameField" v-model="username">
                <label for="pwField">Password</label>
                <input type="password"  id="pwField" v-model="pword">
                <input class="button-primary" type="submit" value="Submit" @submit.prevent="formSubmit">
            </fieldset>
        </form>
    </div>
</template>

<script>
export default {
  name: "dashboard",
  data: () => ({
    username: "",
    pword: ""
  }),
  methods: {
    formSubmit() {
      this.$http
        .post("http://95.179.200.210:8080/auth/local", {
          identifier: this.username,
          password: this.pword
        })
        .then(
          response => {
            console.log("User Token: ", response.data.jwt);
          },
          error => {
            console.error(error);
          }
        );
    }
  }
};
</script>


<style scoped lang="scss">
.loginform {
  max-width: 411px;
  background: #f6f6f6;
  padding: 30px;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  .button-primary {
    margin-bottom: 0;
  }
}
</style>