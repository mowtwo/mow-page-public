<script lang="ts">
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";

  import { fade } from "svelte/transition";

  export let opened: Writable<boolean>;
  export let title = "";
  export let width = "auto";
  export let closeOnEsc = true;
  export let closeOnTochMask = true;
  export let showClose = true;
  export let closeText = "关闭";

  function escHandle(e: KeyboardEvent) {
    if (e.key === "Escape" && closeOnEsc) {
      $opened = false;
    }
  }
  function touchMaskHandle() {
    if (closeOnTochMask) {
      $opened = false;
    }
  }
</script>

<svelte:body on:keyup={escHandle} />
{#if $opened}
  <div class="dialog" transition:fade>
    <div class="mask" on:click={touchMaskHandle} />
    <div class="wrapper" style={`width:${width}`}>
      {#if title !== ""}
        <div class="title">{title}</div>
      {/if}
      <div class="content">
        <slot />
      </div>
      {#if showClose}
        <div class="close">
          <button on:click={() => ($opened = false)}>{closeText}</button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .dialog {
    .mask {
      position: fixed;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      background-color: rgba($color: #000000, $alpha: 0.6);
    }
    .wrapper {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 5px;
      padding: 10px;
      min-width: 300px;
      min-height: 100px;
      display: flex;
      flex-flow: column nowrap;
      .title {
        $resetFontSize: 26px;
        font-size: $resetFontSize;
        font-weight: bold;
        line-height: $resetFontSize;
        padding: 10px;
      }
      .content {
        flex: 1 1;
        padding: 10px;
        overflow: hidden;
      }
      .close {
        text-align: center;
        & > button {
          border: none;
          color: #fff;
          font-size: 16px;
          min-width: 100px;
          height: 40px;
          outline: none;
          background-color: rgb(0, 119, 255);
          border-radius: 3px;
          box-shadow: rgba(0, 119, 255, 0.5) 0px 3px 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          &:hover {
            background-color: rgb(55, 148, 255);
          }
          &:active {
            background-color: rgb(0, 104, 223);
          }
        }
      }
    }
  }
</style>
