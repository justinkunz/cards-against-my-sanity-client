<template>
  <div class="deck">
    <div v-if="submittedCard || !hasStarted" class="post-submit-msg">
      <div v-if="!hasStarted" class="prestart-wrapper">
        <div class="prestart-instructions">
          Share
          <span @click="copyGameLink">
            <span class="game-link copy">this link</span>
            <md-tooltip md-direction="top">{{linkCopyTooltip}}</md-tooltip>
          </span>
          with your friends to invite them to your game.
        </div>
        <div class="game-code">
          People can also join by entering the Game Code at cardsagainstmysanity.com Your game code is
          <span
            @click="copyGameCode"
          >
            <span class="game-code-text copy">{{gameId}}</span>
            <md-tooltip md-direction="bottom">{{codeCopyTooltip}}</md-tooltip>
          </span>
        </div>
      </div>
    </div>
    <div v-else >
      <div v-if="players[playerId].score >=2" @click="confirmCardRefresh()">
        <md-icon class="refresh-cards-icon md-size-2x">cached</md-icon>
        <md-tooltip md-direction="bottom">Don't like your cards? Exchange 2 points to refresh your hand</md-tooltip>
      </div>
    <CardSet
      cardType="white"
      :cards="hand"
      shadow="true"
      :handleClick="handleClick"
      setType="deck"
    />
    </div>
  </div>
</template>


<script>
import CardSet from "./CardSet";
import { mapState } from "vuex";
export default {
  name: "CardHand",
  components: {
    CardSet,
  },
  data() {
    return {
      copied: {
        link: false,
        code: false
      }
    };
  },
  computed: {
    ...mapState({
      hand: state => state.player.hand,
      submittedCard: state => state.player.submittedCard,
      hasStarted: state => state.game.hasStarted,
      players: (state) => state.game.playerSummary,
      playerId: (state) => state.player.playerId,
    }),
    gameId() {
      return this.$route.params.gameId.toLowerCase();
    },
    linkCopyTooltip() {
      return this.copied.link
        ? "Copied to clipboard!"
        : "Copy your game link to your clipboard";
    },
    codeCopyTooltip() {
      return this.copied.code
        ? "Copied to clipboard!"
        : "Copy your game code to your clipboard";
    }
  },
  methods: {
    handleClick(cardId) {
      const gameId = this.$route.params.gameId.toLowerCase();
      this.$store.dispatch("submitCard", { cardId, gameId });
    },
    copyGameLink() {
      const gameId = this.$route.params.gameId.toLowerCase();
      this.$copyText(
        `https://www.cardsagainstmysanity.com/g/${gameId}`,
        this.$refs.container
      );
      this.copied.link = true;
    },
    copyGameCode() {
      this.$copyText(this.gameId, this.$refs.container);
      this.copied.code = true;
    },
    confirmCardRefresh() {
      this.$store.dispatch('toggleRefrshHandConfirm')
    }
  }
};
</script>

<style scoped>
.game-link {
  color: #d53c3c;
}

.copy:hover {
  cursor: pointer;
}

.deck {
  position: fixed;
  bottom: -30px;
  left: 0;
  right: 0;
  height: 250px;
  padding-top: 50px;
  background-color: #6eefde;
  overflow: scroll;
}

.deck::-webkit-scrollbar {
  display: none;
}

.post-submit-msg {
  font-family: "Raleway", sans-serif;
  text-align: center;
  font-size: 36px;
}

.prestart-wrapper {
  line-height: 1.5;
  font-family: "Bebas Neue", sans-serif;
}

.game-code {
  font-size: 18px;
}

.game-code-text {
  font-size: 24px;
  margin-left: 0.25em;
  color: #d53d3c;
}

.refresh-cards-icon {
  position: absolute;
  top: 0;
  left: 10px;
}

.refresh-cards-icon:hover {
  cursor: pointer;
}
</style>