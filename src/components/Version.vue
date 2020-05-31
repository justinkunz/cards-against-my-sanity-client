<template>
<div class="app-version">
    v{{version}}
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Version',
    computed: {
        ...mapGetters(['version'])
    }
}

</script>

<style scoped>
.app-version {
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-weight: 300;
    color: #22252a;
    font-size: 13px;
}
</style>