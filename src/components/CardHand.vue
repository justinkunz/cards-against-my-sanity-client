<template>

<div class="deck" >
    <div v-if="submittedCard || !hasStarted" class="post-submit-msg">
        <div v-if="!hasStarted" class='prestart-wrapper'>
            <div class="prestart-instructions">
                Share this link with your friends to invite them to your game.
            </div>
            <div class="game-code">
            People can also join by entering the Game Code at cardsagainstmysanity.com Your game code is
            <span class="game-code-text">{{gameCode}}</span>               
            </div>
        </div>
    </div>
    <CardSet v-else cardType="white" :cards="hand" shadow="true" :handleClick="handleClick" setType="deck"/>
</div>
</template>


<script>
import CardSet from './CardSet';
import { mapState } from 'vuex';
export default {
    name: 'CardHand',
    components: {
        CardSet
    },
    computed: {
        ...mapState(['hand', 'submittedCard', 'hasStarted']),
        gameCode() {
            return this.$route.params.gameId.substring(1);
        }
    },
    methods: {
        handleClick(cardId) {
            const { gameId } = this.$route.params;
            this.$store.dispatch('submitCard', { cardId, gameId });
        }
    },
}
</script>

<style scoped>
.deck {
    position: fixed;
    bottom: -30px;
    left: 0;
    right: 0;
    height: 250px;
    padding-top: 50px;
    background-color: #6eefde;
}

.post-submit-msg {
    font-family: 'Raleway', sans-serif;
    text-align: center;
    font-size: 36px;
}

.prestart-wrapper {
    line-height: 1.5;
    font-family: 'Bebas Neue', sans-serif;
}

.game-code {
    font-size: 18px;
}

.game-code-text {
    font-weight: 900;
    font-size: 20px;
    margin-left: 0.25em;
}

</style>