<template>
    <sweet-modal ref="confirmReset" blocking hide-close-button v-if="show">
      <div class="title">Refresh Hand?</div>
      <div class="modal-text">Refreshing your hand will cost you <b>2 points</b>. Would you like to continue?</div>
         <md-button class="md-raised md-primary" @click="refreshHand()">Yes, Refresh My Hand</md-button>
      <md-button class="md-raised md-accent" @click="hideModal()">Uhhh, Actually No</md-button>
    </sweet-modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ConfirmResetModal',
    computed: {
      ...mapState({
        show: (state) => state.app.showRefreshModal
      })
    },
    updated() {
      if(this.show) {
          this.$refs.confirmReset.open();
      }
    },
    methods: {
      hideModal() {
        this.$store.dispatch('toggleRefrshHandConfirm')
      },
      async refreshHand() {
         const gameId = this.$route.params.gameId.toLowerCase();
         await this.$store.dispatch("refreshHand", { gameId });
         await this.$store.dispatch("getPlayerInfo", { gameId });
        this.$store.dispatch('toggleRefrshHandConfirm')
      }
    }
}
</script>

<style scoped>
.title {
  font-size: 26px;
  margin-bottom: 15px;
}
</style>