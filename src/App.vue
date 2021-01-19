<template>
  <div id="app">
    <Header />
  </div>
</template>

<script>
import Header from "./components/Header";
import Loading from "./components/Loading";

export default {
  name: "App",
  components: {
    Header,
    Loading
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
</style>
