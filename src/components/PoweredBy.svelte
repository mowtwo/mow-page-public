<script lang="ts">
</script>

<div class="poweredBy">
  <span class="text">Powered by</span>
  <a href="https://vercel.com/"
    ><img class="vercel" src="./images/vercel.svg" alt="vercel" /></a
  >
</div>

<style lang="scss">
  .poweredBy {
    transform: scale(0.6);
    transform-origin: right bottom;
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 0;
    padding: 2px;
    .text {
      padding: 4px;
      display: inline-block;
      font-size: 18px;
      background-color: #000;
      color: #fff;
      height: 100%;
    }
    .vercel {
      height: 20px;
    }
  }
</style>
