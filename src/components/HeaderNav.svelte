<script lang="ts">
  import type { NavItem } from "@/global";

  export let navList: NavItem[] = [];
</script>

<div class="nav">
  {#each navList as { text, link, icon }, i}
    <a class="item" href={link} target="_blank" rel="noopener noreferrer">
      {#if icon}
        <img class="icon" src={icon} alt="icon" />
      {/if}{text}</a
    >
  {/each}
</div>

<style lang="scss">
  .nav {
    display: flex;
    .item {
      color: rgba($color: #fff, $alpha: 0.5);
      margin-left: 20px;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      .icon {
        height: 14px;
        margin-right: 5px;
        opacity: 0.5;
      }
      &:hover {
        color: #fff;
        .icon {
          opacity: 1;
        }
      }
    }
  }
</style>
