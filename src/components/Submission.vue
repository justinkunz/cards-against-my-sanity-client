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
      v-else-if="round.ready"
      :cards="round.cards"
      cardType="white"
      :setType="submissionView"
      :handleClick="handleClick"
    />
    <Card
      v-else-if="submittedCard"
      cardType="white"
      :cardText="submittedCard.text"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardSet from "./CardSet.vue";
import Card from "./Card.vue";

export default {
  name: "Submission",
  components: {
    CardSet,
    Card,
  },
  computed: {
    ...mapState(["submittedCard", "round", "me"]),
    submissionView() {
      return this.me.isCardzar ? "cardzarSubmission" : "submission";
    },
  },
  methods: {
    handleClick(cardId) {
      const { gameId } = this.$route.params;
      this.$store.dispatch("selectRoundWinner", { cardId, gameId });
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
