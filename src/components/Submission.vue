<template>
  <div class="submission">
    <div v-if="round.winner" class="winning-card">
      <Card
        cardType="white"
        :cardText="round.winningCard.text"
      />
       <div class="winning-card-text">{{round.winner.name}} won!</div>
    </div>

     <CardSet
      v-else-if="cardSubmissions"
      :cards="cardSubmissions"
      cardType="white"
      :setType="submissionView"
      :flip="round.ready"
      :handleClick="handleClick"
      startingPosition="back"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CardSet from "./CardSet.vue";
import Card from "./Card.vue";

export default {
  name: "Submission",
  components: {
    CardSet,
    Card,
  },
  computed: {
    ...mapState({
      round: (state) => state.game.round,
      isCardzar: (state) => state.player.isCardzar,

    }),
    ...mapGetters(['cardSubmissions']),
    submissionView() {
      return this.isCardzar && this.round.ready ? "cardzarSubmission" : "submission";
    },
  },
  methods: {
    handleClick(cardId) {
      if(this.round.ready && this.isCardzar){
        const gameId = this.$route.params.gameId.toLowerCase();
        this.$store.dispatch("selectRoundWinner", { cardId, gameId });
      }
    },
  },
};
</script>

<style>
.winning-card-text {
    color: #96ff94;
    text-align: center;
    font-size: 24px;
    margin: 10px;
    font-family: 'Raleway';
    font-weight: 600;
}
</style>
