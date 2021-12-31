<script lang="ts">
  import InfoItem from "./InfoItem.svelte";

  export let key: string;
  export let name: string;
</script>

<div class="panel">
  <InfoItem name={key} divider={false}>{name}</InfoItem>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  .panel {
    .content {
      padding: 20px 40px;
      line-height: 26px;
    }
  }
</style>
