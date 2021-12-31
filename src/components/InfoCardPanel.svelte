<script lang="ts">
  export let height: number | "auto" = "auto";
  $: cssHeight = typeof height === "string" ? height : `${height}px`;
</script>

<div class="panel" style={`height:${cssHeight}`}>
  <slot />
</div>

<style lang="scss">
  .panel {
    min-height: 50px;
    border-left: solid 30px #ccc;
    padding: 10px;
  }
</style>
