<template>
  <div>
    <div class="user-submission-text">Your Submission</div>
    <div class="user-submission">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSubmission"
};
</script>

<style>
.user-submission {
  height: 400px;
  width: 250px;
  border: solid 3px rgb(126, 233, 126);
}
.user-submission-text {
    font-family: sans-serif;
}
</style>