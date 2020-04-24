<template>
<div class="cardzar-msg">
    <div class="cardzar-msg--main">You are the Cardzar</div>
    <div v-if="!round.ready" class="cardzar-msg--sub">Waiting on submissions. . .</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Cardzar',
    computed: {
        ...mapState(['round'])
    },
}
</script>

<style>
.cardzar-msg {
    font-weight: 100;
    text-align: center;
    position: absolute;
    bottom: 75px;
    color: white;
    font-family: 'Raleway';
    line-height: 1;
}

.cardzar-msg--main {
    font-size: 44px;
}

.cardzar-msg--sub {
    font-size: 24px;
}
</style>