<template>
  <div class="card-set">
    <div
      :class="container.outerBox"
      v-for="(card, index) in cards"
      :key="card.id"
      @click="validateClick(card.id)"
    >
      <div :class="container.innerBox">{{container.text}}</div>
      <FlipWrapper :flip="flip" :time="getFlipTime(index)" :startingPosition="startingPosition || 'front'">
        <template v-slot:front>
          <Card :cardType="cardType" :cardText="card.text" :shadow="shadow" class="single-card" />
        </template>
        <template v-slot:back>
          <Card
            :cardType="cardType"
            cardText="Cards Against My Sanity"
            :shadow="shadow"
            class="single-card"
          />
        </template>
      </FlipWrapper>
    </div>
  </div>
</template>


<script>
import Card from "./Card.vue";
import FlipWrapper from "./FlipWrapper.vue";

export default {
  components: {
    Card,
    FlipWrapper
  },
  computed: {
    container() {
      switch (this.setType) {
        case "deck":
          return {
            outerBox: "cardContainer",
            innerBox: "selectContainer",
            text: "Submit"
          };
        case "cardzarSubmission":
          return {
            outerBox: "cardzar-outerbox",
            innerBox: "cardzar-innerbox",
            text: ""
          };
        case "submission":
          return {
            outerBox: "submission-outerbox",
            innerBox: "submission-innerbox",
            text: ""
          };
        default:
          return { innerBox: "", text: "" };
      }
    }
  },
  name: "CardSet",
  props: [
    "cards",
    "cardType",
    "shadow",
    "setType",
    "handleClick",
    "flip",
    "startingPosition"
  ],
  methods: {
    validateClick(id) {
      const { handleClick } = this;
      if (handleClick && typeof handleClick === "function") {
        handleClick(id);
      }
    },
    getFlipTime(i) {
      const baseTime = 600;
      return baseTime * (i + 1);
    }
  }
};
</script>

<style scoped>
.card-set {
  display: flex;
  justify-content: center;
  margin: 0 -1em;
  flex-wrap: wrap;
}

.submission-outerbox,
.cardzar-outerbox {
  margin-top: 15px;
}
.selectContainer {
  visibility: hidden;
  position: relative;
  width: 80%;
  margin: 0 10%;
  text-align: center;
  font-family: sans-serif;
  padding: 0.5em 0;
  border-radius: 6px 6px 0 0;
  font-size: 20px;
  font-weight: 100;
  background: #fe80ab;
}

.cardContainer {
  position: relative;
  top: 0;
  transition: ease 0.5s;
}

.cardContainer:hover {
  top: -55px;
  cursor: pointer;
}

.cardzar-outerbox {
  position: relative;
  top: 0;
  transition: ease 0.5s;
}

.cardzar-outerbox:hover {
  top: -20px;
  cursor: pointer;
}

.cardContainer:hover > .selectContainer {
  visibility: visible;
}
</style>