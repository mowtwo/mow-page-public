<script lang="ts">
  import resolveClass from "@/utils/resolveClass";

  export let level: number = 0;
</script>

<div class={resolveClass("rate", "level-" + level)}>
  {#each Array(10) as _, i}
    <div class="block" class:active={i < level} />
  {/each}
</div>

<style lang="scss">
  .rate {
    display: flex;
    height: 100%;
    .block {
      width: 24px;
      height: 40px;
      background-color: #eee;
      margin-right: 8px;
      transform: skewX(-20deg);
    }
    &.level-1,
    &.level-2 {
      .block.active {
        background-color: rgb(255, 94, 0);
      }
    }
    &.level-3,
    &.level-4 {
      .block.active {
        background-color: rgb(255, 238, 0);
      }
    }
    &.level-5,
    &.level-6 {
      .block.active {
        background-color: rgb(136, 255, 0);
      }
    }
    &.level-7,
    &.level-8 {
      .block.active {
        background-color: rgb(30, 255, 0);
      }
    }
    &.level-9,
    &.level-10 {
      .block.active {
        background-color: rgb(0, 255, 106);
      }
    }
  }
</style>
