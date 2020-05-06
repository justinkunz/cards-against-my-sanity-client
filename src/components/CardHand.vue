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
    <CardSet
      v-else
      cardType="white"
      :cards="hand"
      shadow="true"
      :handleClick="handleClick"
      setType="deck"
    />
  </div>
</template>


<script>
import CardSet from "./CardSet";
import { mapState } from "vuex";
export default {
  name: "CardHand",
  components: {
    CardSet
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
      hasStarted: state => state.game.hasStarted
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
</style>