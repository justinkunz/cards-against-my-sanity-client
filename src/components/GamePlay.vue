<template>
  <div class="current-game">
    <Countdown :time="time" />
    <sweet-modal ref="captureName" blocking hide-close-button>
      <md-field md-inline class="player-name-input">
        <label>Enter your name</label>
        <md-input v-model="form.name" maxlength="18"></md-input>
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
      <div v-if="isVIP && hasStarted && !round.ready && !haveCardSubmissions" @click="skipBlackCard()">
        <div class="skip-card">
          Skip Card
        </div>
        <md-tooltip md-direction="bottom">As the game's VIP, you can skip black cards</md-tooltip>
      </div>
    </div>

    <Submission />

    <Cardzar v-if="isCardzar" />
    <CardHand v-else />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Card from "./Card.vue";
import CurrentPlayers from "./CurrentPlayers.vue";
import { db } from "../firebase";
import CardHand from "./CardHand.vue";
import Cardzar from './Cardzar.vue';
import Submission from './Submission.vue';
import Winner from './Winner.vue';
import Countdown from './Countdown';

export default {
  name: "GamePlay",
  components: {
    Card,
    Countdown,
    CurrentPlayers,
    CardHand,
    Cardzar,
    Submission,
    Winner,
  },
  data() {
    return {
      form: {
        name: null,
        nameAlert: '',
      },
      time: 10
    };
  },
  computed: {
    ...mapState({
      submittedCard: (state) => state.player.submittedCard,
      blackCard: (state) => state.game.blackCard,
      isCardzar: (state) => state.player.isCardzar,
      round: (state) => state.game.round,
      isGameOver: (state) => state.game.isGameOver,
      isVIP: (state) => state.player.isVIP,
      hasStarted: (state) => state.game.hasStarted,
    }),
    ...mapGetters(['haveCardSubmissions'])
  },
  async mounted() {
    const gameId = this.$route.params.gameId.toLowerCase();
    this.trackFirebase(gameId);
    const jwtToken = localStorage.getItem(`p-${gameId}`);
    if (!jwtToken) {
      this.$refs.captureName.open();
    } else {
      this.$store.dispatch("getPlayerInfo", { gameId });
    }
  },
  updated() {
    const  gameId = this.$route.params.gameId.toLowerCase();
    const jwtToken = localStorage.getItem(`p-${gameId}`);

    if (jwtToken) {
      this.$refs.captureName.close();
    }
  },
  methods: {
    trackFirebase(gameId) {
      const gameRef = db.ref(`games/${gameId}`);
      gameRef.on("value", (snapshot) => {
        const game = snapshot.val();
        if (game) {
          if(game.blackCard.text !== this.blackCard.text) {
            const jwtToken = localStorage.getItem(`p-${gameId}`)
            if(jwtToken){
              this.$store.dispatch('getPlayerInfo', { gameId });
            }
          }
          this.$store.dispatch("updateGame", game);

        }
      });
    },
    skipBlackCard() {
      const  gameId = this.$route.params.gameId.toLowerCase();
      this.$store.dispatch('skipBlackCard', gameId)
    },
    async addPlayer() {
      try {
      const gameId = this.$route.params.gameId.toLowerCase();
       this.$refs.captureName.close();
       await this.$store.dispatch("addPlayer", { gameId, name: this.form.name });
      } catch(err) {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
.add-player-btn {
  margin-top: 2em;
}

.skip-card {
  background: #79bece;
  width: 70%;
  margin: 0 auto;
  text-align: center;
  font-family: sans-serif;
  padding: 0.25em 0;
  border-radius: 0 0 6px 6px;
  font-size: 16px;
  font-weight: 900;
}
.skip-card:hover {
  cursor: pointer;
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
  overflow: scroll;
  padding-top: 5em;
}

.current-game::-webkit-scrollbar {
    display: none;
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
