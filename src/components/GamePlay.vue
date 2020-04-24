<template>
  <div class="current-game">
    <sweet-modal ref="captureName">
      <md-field md-inline class="player-name-input">
        <label>Enter your name</label>
        <md-input v-model="form.name"></md-input>
      </md-field>
      <md-button
        class="md-raised md-primary add-player-btn"
        @click="addPlayer()"
      >
        Join Game
      </md-button>
    </sweet-modal>
    <CurrentPlayers />
    <div class="current-card">
      <Winner v-if="isGameOver" />
      <Card v-else cardType="black" :cardText="blackCard.text" />
    </div>
    <Submission />
    <Cardzar v-if="me.isCardzar" />
    <CardHand v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "./Card.vue";
import CurrentPlayers from "./CurrentPlayers.vue";
import { db } from "../firebase";
import CardHand from "./CardHand.vue";
import Cardzar from './Cardzar.vue';
import Submission from './Submission.vue';
import Winner from './Winner.vue';

export default {
  name: "GamePlay",
  components: {
    Card,
    CurrentPlayers,
    CardHand,
    Cardzar,
    Submission,
    Winner
  },
  data() {
    return {
      form: {
        name: null,
        nameAlert: '',
      },
    };
  },
  computed: {
    ...mapState(["submittedCard", "blackCard", "me", "round", "playerId", "isGameOver"]),

  },
  async mounted() {
    console.log(this.$route);
    const { gameId } = this.$route.params;
    this.trackFirebase(gameId);
    const playerId = localStorage.getItem(`p-${gameId}`);
    console.log({playerId})
    if (!playerId) {
      this.$refs.captureName.open();
    } else {
      this.$store.dispatch("getPlayerInfo", { playerId, gameId });
      console.log("adding");
    }
  },
  updated() {
    const { gameId } = this.$route.params;
    const playerId = localStorage.getItem(`p-${gameId}`);

    if (playerId) {
      this.$refs.captureName.close();
    }
  },
  methods: {
    trackFirebase(gameId) {
      const gameRef = db.ref(`games/${gameId}`);
      gameRef.on("value", (snapshot) => {
        const game = snapshot.val();
        console.log("=====UPDATE FROM FIREBASE====", game);
        if (game) {
          if(game.blackCard.text !== this.blackCard.text) {
            const playerId = localStorage.getItem(`p-${gameId}`)
            if(playerId){
              this.$store.dispatch('getPlayerInfo', { gameId, playerId });
            }
          }
          this.$store.commit("updateGame", { game, gameId });

        }
      });
    },
    addPlayer() {
      const { gameId } = this.$route.params;
       this.$refs.captureName.close();
       this.$store.dispatch("addPlayer", { gameId, name: this.form.name });
    },
  },
};
</script>

<style scoped>
.add-player-btn {
  margin-top: 2em;
}

.player-name-input {
  width: 50%;
  text-align: center;
  margin: 0 auto;
  font-size: 22px;
}
.current-game {
  display: flex;
  justify-content: center;
}

.name-modal {
  text-align: center;
  font-family: sans-serif;
  background-color: #272727;
  height: 100%;
}
.name-label {
  font-size: 30px;
  padding: 1em;
  color: white;
}

.name-input {
  height: 28px;
  font-size: 24px;
  border-radius: 6px;
  width: 200px;
}

.record-name {
  margin: 0 auto;
  font-size: 24px;
  background-color: rgb(170, 51, 170);
  border-radius: 6px;
  padding: 0.5em;
}

.btn-cont {
  margin-top: 1em;
}
</style>
