<template>
  <div class="players-list-container">
    <md-card
      class="players-list"
      :class="playerListDisplay.containerClass"
      md-with-hover
    >
      <md-ripple>
        <md-card-header>
          <div class="md-title">Players</div>
        </md-card-header>
        <md-card-content class="players-list-content">
          <md-list>
            <md-list-item
              v-for="(player, index) in formattedPlayers"
              :key="index"
              :class="determineWrapperClass(player)"
            >
              <md-avatar :class="player.color">{{ player.initials }}</md-avatar>

              <md-tooltip v-show="player.isCardzar"
                >{{ player.name }} is the cardzar</md-tooltip
              >
              <div v-show="player.isCardzar" class="cardzar-crown-wrap">
                <i class="fas fa-crown cardzar-crown"></i>
              </div>
              <span class="md-list-item-text">{{ player.name }}</span>
              <span class="score">{{ player.score }}</span>
            </md-list-item>
          </md-list>
        </md-card-content>
        <div
          class="btn-container"
          v-if="!hasStarted && players.length >= 3 && isVIP"
        >
          <md-button class="md-dense md-raised md-primary" @click="beginGame()"
            >Start Game</md-button
          >
        </div>
        <div class="btn-container" v-else-if="!hasStarted && isVIP">
          <md-button class="md-raised" disabled>Start Game</md-button>
          <md-tooltip md-direction="bottom"
            >Must have a minimum of 3 players</md-tooltip
          >
        </div>
      </md-ripple>
      <div
        class="player-list-side-label"
        v-if="hasStarted"
        :class="playerListDisplay.labelClass"
        @click="togglePlayersList()"
      >
        {{ playerListDisplay.labelText }}
      </div>
    </md-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "CurrentPlayers",
  computed: {
    ...mapState({
      hasStarted: (state) => state.game.hasStarted,
      round: (state) => state.game.round,
      showPlayerList: (state) => state.app.showPlayerList,
      isVIP: (state) => state.player.isVIP,
    }),
    ...mapGetters(["players"]),
    formattedPlayers() {
      let colorNum = 1;
      return this.players.map((player) => {
        const { name, score, isCardzar, id } = player;
        const words = name.trim().split(" ");

        const initials =
          words.length === 1
            ? name[0].toUpperCase() + (name[1] || "").toLowerCase()
            : words
                .slice(0, 2)
                .map((i) => i[0])
                .join("")
                .toUpperCase();

        const color = `player-avatar--${colorNum}`;
        colorNum = colorNum >= 5 ? 1 : colorNum + 1;
        return {
          id,
          name,
          score,
          initials,
          isCardzar,
          color,
        };
      });
    },
    playerListDisplay() {
      return this.showPlayerList
        ? {
            containerClass: "players-list--open",
            labelClass: "player-list-side-label--visible",
            labelText: "Hide",
          }
        : {
            containerClass: "players-list--closed",
            labelClass: "player-list-side-label--hidden",
            labelText: "Show",
          };
    },
  },
  methods: {
    beginGame() {
      this.$store.dispatch(
        "beginGame",
        this.$route.params.gameId.toLowerCase()
      );
    },
    determineWrapperClass(player) {
      if (player.isCardzar) return "cardzar";
      if (this.round.winner && player.id === this.round.winner.id)
        return "winner";
      return "";
    },
    togglePlayersList() {
      this.$store.dispatch("togglePlayerListView");
    },
  },
};
</script>

<style>
.players-list {
  transition: 0.5s ease-in-out !important;
  position: absolute !important;
  left: 0;
  padding: 10px 0;
  border-radius: 0 10px 10px 0 !important;
}

.players-list--open {
  min-width: 250px;
  width: inherit;
}

.players-list--closed {
  min-width: 0;
  width: 24px;
}

.md-list-item-text {
  margin-right: 0.5em;
}
.score {
  font-weight: 600;
  color: #448aff;
}

.btn-container {
  margin: 0 auto;
  text-align: center;
}
.md-avatar {
  color: white;
  text-align: center;
  font-size: 14px;
}

.player-list-side-label {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  writing-mode: vertical-rl;
  text-align: center;
  z-index: 999;
  font-size: 18px;
  width: 24px;
  color: #22252a;
  border-radius: 0 10px 10px 0;
  font-family: "Raleway", sans-serif;
  font-weight: 900;
}

.player-list-side-label--visible {
  background: #f8d486;
}
.player-list-side-label--hidden {
  background: #b1f886;
}

.cardzar-crown-wrap {
  height: 25px;
  width: 25px;
  padding: 3px;
  border-radius: 100%;
  background-color: #fdea48;
  position: absolute;
  z-index: 999;
  top: 3px;
  left: 1px;
}

.cardzar-crown {
  color: #4c4d4d;
}
.winner {
  background: #00d41c59;
  border-radius: 30px;
  margin: 5px 12px 5px 0;
}
.players-list-content {
  max-height: 350px;
  overflow: scroll;
}

.player-avatar--1 {
  background-color: #673ab7;
}

.player-avatar--2 {
  background-color: #009688;
}

.player-avatar--3 {
  background-color: #f44336;
}

.player-avatar--4 {
  background-color: #3f51b5;
}

.player-avatar--5 {
  background-color: #607d8b;
}
</style>
