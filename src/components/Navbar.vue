<template>
  <div>
    <nav>
      <div class="nav-title">Cards Against My Sanity</div>
    </nav>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  text-align: center;
  font-size: 24px;
  color: white;
  font-family: sans-serif;
  line-height: 5rem;
  clear: both;
  font-weight: 100;
}

.nav-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px;
}
.clear {
    clear:both;
    height: 5rem;
    width:100%;
}

</style>