<template>
    <div class="countdown-container">
        <div class="countdown">{{timeRemaining}}</div>
    </div>
</template>

<script>
export default {
    name: 'Countdown',
    props: ['time'],
    data() {
        return {
            timeRemaining: this.time
        }
    },
    mounted() {
        const timeInterval = setInterval(() => {
            this.timeRemaining--;
            if(this.timeRemaining === 0) {
                clearInterval(timeInterval)
            }
        }, 1000)
    }
}
</script>

<style scoped>
.countdown-container {
    position: absolute;
    top: 0;
    right: 0;
    margin: 28px;
    background: #6eefde;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    font-size: 30px;
    line-height: 50px;
    color: #22252a;
    text-align: center;
}
</style>