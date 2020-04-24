<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { db } from "./firebase";

export default {
  name: "App",
  components: {
    Navbar
  },
  created() {
    const gameRef = db.ref("games");
    gameRef.on("value", snapshot => {
      this.gameData = snapshot.val();
    });
  },
  data() {
    return {
      cards: ["This is a card", "And another"],
      gameData: null
    };
  },
  methods: {
    add() {
      // console.log('g',g)
      console.log(this.gameData);
      console.log("ayyeee");
      // gameRef.push({ text: 'world' });
    }
  },
};
</script>

<style>
body {
  font-family: "Nanum Gothic", sans-serif;
  background: #212529
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