<template>
  <div>
    <md-content v-if="shadow" class="md-elevation-9 card-shadow">
      <div :class="cardClass.container" @click="handleClick">
        <div :class="cardClass.text">{{cardText}}</div>
      </div>
    </md-content>
    <div v-else>
      <div :class="cardClass.container" @click="handleClick">
        <div :class="cardClass.text">
          <div v-if="cardType === 'black' && winningAnswer">
            <span>{{answerCard.preBlank}}</span>
            <span class="card-winning-answer"> {{answerCard.answer}} </span>
            <span>{{answerCard.postBlank}}</span>
          </div>
          <div v-else>{{cardText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["cardText", "cardType", "cardId", "shadow", "winningAnswer"],
  computed: {
    cardClass() {
      const classes = {
        white: {
          container: "card card--white",
          text: "card-text card-text--white"
        },
        black: {
          container: "card card--black",
          text: "card-text card-text--black"
        }
      };

      return classes[this.cardType];
    },
    answerCard() {
      const answerIdentifier = '______';
      const [preBlank, postBlank] = this.cardText.split(answerIdentifier);
      return {
        preBlank,
        answer: this.winningAnswer.replace('.', ''),
        postBlank
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit("click", this.cardId);
    }
  }
};
</script>
 
<style scoped>
.card {
  height: 220px;
  width: 150px;
  border-radius: 10px;
  padding: 25px;
  margin: 0 1rem;
  overflow: scroll;
}

.card-shadow {
  border-radius: 10px;
}

.card--black {
  background-color: black;
  height: 330px;
  width: 225px;
}

.card--white {
  background-color: #ffffff;
}

.card-text {
  font-size: 14px;
  font-weight: 900;
  font-family: sans-serif;
  text-align: left;
  word-break: break-word;
}

.card-text--black {
  color: #ffffff;
  font-size: 20px;
}

.card-text--white {
  color: black;
}

.card-winning-answer {
  color: #d54141;
  font-weight: 900;
}
</style>