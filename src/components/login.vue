<template>
    <div class="wrapper">
        <img src="@/assets/nettitude-logo.png" alt="nettitude logo" class="logo">
        <form class="loginform" @submit.prevent="formSubmit" >
            <fieldset>
                <label for="nameField">User Name</label>
                <input type="text" placeholder="Enter Username" id="nameField" v-model="username" required>
                <label for="pwField">Password</label>
                <input type="password" id="pwField" v-model="pword">
                <input class="button-primary" type="submit" value="Submit" required>
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
      console.log(this.username, this.pword);
      this.$http
        .post("http://95.179.200.210:8080/auth/local", {
          identifier: this.username,
          password: this.pword
        })
        .then(
          response => {
            console.log("User Token: ", response.data.jwt);
            localStorage.setItem("jwtTokenTad", response.data.jwt);
            this.$router.push("/");
          },
          error => {
            console.error(error);
            localStorage.removeItem("jwtTokenTad");
          }
        );
    }
  }
};
</script>


<style scoped lang="scss">
.logo{
    margin-top: 30px;
    margin-left: 30px;
}
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