<template>
    <sweet-modal ref="joinOrStart">
      <div class="winner-title">
        {{gameWinner.name}} Wins!!
      </div>
      <div class="game-btn-container">
        <md-button class="md-raised md-primary" @click="playAgain()"
          >Play Again</md-button
        >
      </div>
    </sweet-modal>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Winner',
    computed: {
        ...mapState(['gameWinner'])
    },
    methods: {
      playAgain() {
        const { gameId } = this.$route.params;
        this.$store.dispatch('resetGame', gameId)
      }
    },
    mounted() {
        this.$refs.joinOrStart.open();
  },

}
</script>

<style>
.winner-title {
  font-size: 50px;
  font-family: "Bebas Neue", sans-serif;
  margin-bottom: 50px;
}

</style>