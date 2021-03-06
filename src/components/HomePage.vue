<template>
  <div>
    <sweet-modal ref="joinOrStart" blocking hide-close-button>
      <div class="app-title">Cards Against My Sanity</div>
      <div class="game-btn-container">
        <md-button class="md-raised md-primary" @click="getGameOptions()"
          >Start New Game</md-button
        >
      </div>
      <div class="seperator-container">
        <div class="seperator"></div>
        <div class="seperator-text">or</div>
        <div class="seperator"></div>
      </div>
      <div class="game-btn-container">
        <md-button class="md-raised md-accent" @click="getGameCode()"
          >Join Existing Game</md-button
        >
      </div>
    </sweet-modal>

    <sweet-modal ref="gameOptions" blocking hide-close-button>
      <div class="app-title">Cards Against My Sanity</div>
      <div class="app-title--sub">Game Options</div>
      <md-field md-inline class="game-code-input">
        <label>Winning Score</label>
        <md-input v-model="options.winningScore" type="number"></md-input>
      </md-field>
      <div class="pack-selection">
        <md-button
          v-if="expansion.showPrimaryBtn"
          class="md-dense md-primary"
          @click="showExpansionPacks('primary')"
          >Add Expansion Packs</md-button
        >
        <div class="pack-selection-title">
          <div class="md-layout md-gutter md-alignment-center">
            <div
              v-for="(pack, index) in expansionPacks"
              :key="index"
              class="md-layout-item md-size-50 md-xsmall-size-100"
            >
              <md-checkbox
                class="pack md-primary"
                v-model="options.packs"
                :value="pack"
                >{{ pack }}</md-checkbox
              >
            </div>
          </div>
        </div>
        <md-button
          v-if="expansionPacks.length > 0 && expansion.showAllBtn"
          class="md-dense md-primary"
          @click="showExpansionPacks('all')"
          >View All Expansion Packs</md-button
        >
      </div>
      <md-button class="md-raised md-primary" @click="launchGame()"
        >Start Game</md-button
      >
    </sweet-modal>

    <sweet-modal ref="joinGame" blocking hide-close-button>
      <md-field md-inline class="game-code-input">
        <label>Game Code</label>
        <md-input v-model="form.gameCode"></md-input>
      </md-field>
      <md-button
        class="md-raised md-primary add-player-btn"
        @click="redirectToGame()"
        >Join Game</md-button
      >
    </sweet-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      form: {
        gameCode: "",
      },
      options: {
        packs: [],
        winningScore: null,
      },
      expansion: {
        showPrimaryBtn: true,
        showAllBtn: true,
      },
    };
  },
  computed: {
    ...mapState({
      expansionPacks: (state) => state.game.expansionPacks,
    }),
  },
  methods: {
    async launchGame() {
      const gameId = await this.$store.dispatch("createGame", this.options);
      this.$router.push(`/g/${gameId}`);
    },
    getGameOptions() {
      this.$refs.joinOrStart.close();
      this.$refs.gameOptions.open();
    },
    async showExpansionPacks(source) {
      if (source === "primary") {
        this.expansion.showPrimaryBtn = false;
      } else {
        this.expansion.showAllBtn = false;
      }
      await this.$store.dispatch("getExpansionPacks", {
        showAll: source === "all",
      });
    },
    getGameCode() {
      this.$refs.joinOrStart.close();
      this.$refs.joinGame.open();
    },
    redirectToGame() {
      this.$router.push(`/g/${this.form.gameCode}`);
    },
  },
  mounted() {
    this.$refs.joinOrStart.open();
  },
};
</script>

<style scoped>
.app-title {
  font-size: 50px;
  font-family: "Bebas Neue", sans-serif;
  margin-bottom: 50px;
}

.app-title--sub {
  font-size: 24px;
  font-family: "Bebas Neue", sans-serif;
  margin-top: -60px;
}
.game-btn-container {
  text-align: center;
}

.seperator-container {
  margin: 20px;
  display: flex;
  justify-content: center;
}

.seperator-text {
  font-weight: 200;
}

.seperator {
  width: 40%;
  border-top: solid 1px #ac9e9e;
  height: 0;
  margin: 12px;
}

.game-code-input {
  width: 50%;
  text-align: center;
  margin: 0 auto;
  font-size: 22px;
}

.md-checkbox {
  display: flex;
}
</style>
