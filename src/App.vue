<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Version />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Version from './components/Version';

export default {
  name: "App",
  components: {
    Navbar,
    Version
  }
};
</script>

<style>
body {
  font-family: "Nanum Gothic", sans-serif;
  background: #212529;
}
</style>

<style scoped>
.current-card {
  margin-top: 20px;
}

.current-game {
  display: flex;
  justify-content: space-around;
}
</style>