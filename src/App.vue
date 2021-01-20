<template>
  <div id="app">
    <Header />
    <Home />
  </div>
</template>

<script>
import Header from "./components/Header";
import Home from "./containers/Home/Home";

export default {
  name: "App",
  components: {
    Header,
    Home
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 512px;
  height: 580px;
  /* border: 1px solid black; */
}
</style>
