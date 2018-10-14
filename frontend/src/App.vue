<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "./components/dashboard";

export default {
  name: "app",
  components: {
    Dashboard
  }
};
</script>

<style lang="scss">
body {
  background-color: #464646;
  font-size: 16px;
  font-family: "Rajdhani", sans-serif;
  overflow-y: scroll;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a:link {
  color: #95989a;
  text-decoration: none;
}

/* visited link */
a:visited {
  color: #95989a;
  text-decoration: none;
}

/* mouse over link */
a:hover {
  color: white;
  text-decoration: none;
}

a:active {
  color: white;
  text-decoration: none;
}
</style>
