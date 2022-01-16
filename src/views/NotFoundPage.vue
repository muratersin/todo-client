<template>
  <div class="not-found-page">
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
      <v-btn text to="/actives" color="primary">Go to Home</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>

<style lang="scss">
.not-found-page {
  margin-top: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 34px;

  h1 {
    font-size: 70px;
  }
}
</style>
