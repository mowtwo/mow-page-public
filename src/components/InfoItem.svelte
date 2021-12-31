<script lang="ts">
  export let name = "";
  export let divider = true;
</script>

<div class="item" class:divider>
  <div class="name">{name}</div>
  <div class="value">
    <slot />
  </div>
</div>

<style lang="scss">
  .item {
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 16px;
    &.divider {
      &:not(:last-child) {
        border-bottom: solid 1px #ccc;
      }
    }
    .name {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 40%;
      white-space: nowrap;
      background-color: rgb(218, 218, 218);
    }
    .value {
      white-space: nowrap;
      padding-left: 40px;
    }
  }
</style>
