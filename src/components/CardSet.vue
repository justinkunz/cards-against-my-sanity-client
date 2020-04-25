<template>
<div class="card-set">
    <div :class="container.outerBox" v-for="card in cards" :key="card.id" @click="validateClick(card.id)">
        <div :class="container.innerBox">
            {{container.text}}
        </div>
            <Card :cardType="cardType" :cardText="card.text" :shadow="shadow" class="single-card" />            
    </div>
</div>
</template>


<script>
import Card from './Card.vue';

export default {
    components: {
        Card,
    },
    computed: {
        container() {
            switch(this.setType) {
                case "deck":
                    return { outerBox: 'cardContainer', innerBox: 'selectContainer', text: 'Submit'}
                case "cardzarSubmission":
                    return { outerBox: 'cardzar-outerbox', innerBox: 'cardzar-innerbox', text: ''}
                case "submission":
                    return { outerBox: 'submission-outerbox', innerBox: 'submission-innerbox', text: ''}
                 default:
                    return { innerBox: '', text: ''}
            }
        }
    },
    name: 'CardSet',
    props: ['cards', 'cardType', 'shadow', 'setType', 'handleClick'],
    methods: {
        validateClick(id) {
            const { handleClick } = this;
            if(handleClick && typeof handleClick === "function") {
                handleClick(id);
            }
        }
    }
}
</script>

<style scoped>
    .card-set {
        display: flex;
        justify-content: center;
        margin: 0 -1em;
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
        font-weight:100;  
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

    .cardContainer:hover >
    .selectContainer {
        visibility: visible;
    }

</style>