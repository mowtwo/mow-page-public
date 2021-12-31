<script lang="ts">
  import type { NavItem } from "@/global";
  import resolveClass from "@/utils/resolveClass";
  import { Link } from "svelte-routing";

  export let navList: NavItem[] = [];
  export let activeIndex = -1;
</script>

<div class="nav">
  {#each navList as { text, link }, i}
    <span class="item">
      <Link to={link}>
        <span
          class={resolveClass(
            "link-bottom-border",
            activeIndex === i ? "active" : ""
          )}
        >
          {text}
        </span>
      </Link>
    </span>
  {/each}
</div>

<style lang="scss">
  .nav {
    display: inline-flex;
    .item {
      margin: 0 40px;
      transition: all 0.3s ease;
      :global(a) {
        color: rgba($color: #fff, $alpha: 0.6);
        text-decoration: none;
      }
      &:hover {
        :global(a) {
          color: rgba($color: #fff, $alpha: 1);
        }
      }
    }
  }

  .link-bottom-border {
    position: relative;
    white-space: nowrap;
    &.active {
      color: #fff;
      &::after {
        transform: scaleX(1);
      }
    }
    &:hover {
      &::after {
        transform: scaleX(1);
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: #fff;
      left: 0;
      bottom: -5px;
      transform: scaleX(0);
      transition: all 0.3s ease;
      transform-origin: left;
    }
  }
</style>
