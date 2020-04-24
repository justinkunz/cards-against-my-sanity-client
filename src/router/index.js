import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '../components/HomePage.vue';
import GamePlay from '../components/GamePlay.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'LandingPage',
            component: LandingPage
        },
        {
            path: '/g/:gameId',
            name: 'GamePlay',
            component: GamePlay
        },
    ]
});

export default router;