<script lang="ts">
</script>

<div class="group">
  <slot />
</div>

<style lang="scss">
  .group {
    background-color: #fff;
    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }
</style>
