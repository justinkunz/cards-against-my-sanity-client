<template>
  <div class="cardzar-msg" v-if="isCardzar && !isGameOver && !roundRequested">
    <div class="next-round-btn-container" v-if="round.isComplete">
      <md-button class="next-round-btn" @click="nextRound"
        >Next Round</md-button
      >
    </div>
    <div v-else class="cardzar-msg--main">You are the Cardzar</div>
    <div v-if="!round.ready" class="cardzar-msg--sub">
      Waiting on submissions. . .
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Cardzar",
  data() {
    return {
      roundRequested: false,
    };
  },
  mounted() {
    this.manualCheck = setInterval(() => {
      if (!this.round.ready && this.isCardzar) {
        this.$store.dispatch(
          "checkRoundStatus",
          this.$route.params.gameId.toLowerCase()
        );
      }
    }, 10000);
  },
  updated() {
    if (this.round.ready) {
      clearInterval(this.manualCheck);
    }
  },
  computed: {
    ...mapState({
      round: (state) => state.game.round,
      isCardzar: (state) => state.player.isCardzar,
      isGameOver: (state) => state.game.isGameOver,
    }),
  },
  methods: {
    nextRound() {
      this.roundRequested = true;

      this.$store.dispatch(
        "nextRound",
        this.$route.params.gameId.toLowerCase()
      );
    },
  },
};
</script>

<style scoped>
.cardzar-msg {
  font-weight: 100;
  text-align: center;
  position: absolute;
  bottom: 75px;
  color: white;
  font-family: "Raleway";
  line-height: 1;
}

.cardzar-msg--main {
  font-size: 44px;
}

.cardzar-msg--sub {
  font-size: 24px;
}

.next-round-btn-container {
  position: fixed;
  right: 25%;
  left: 25%;
  width: 50%;
  bottom: 120px;
  height: 50px;
}

.next-round-btn {
  font-size: 24px;
  height: 100%;
  width: 100%;
  font-weight: 900;
  color: #22252a !important;
  background-color: #65d8eb;
}
</style>
