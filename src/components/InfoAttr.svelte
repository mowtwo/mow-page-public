<script lang="ts">
  import resolveClass from "@/utils/resolveClass";

  export let icon: string;
  export let color: string = "#000";
</script>

<div class="attr">
  <div class="icon" style={`background-color:${color}`}>
    <i class={resolveClass("iconfont", `icon-${icon}`)} />
    <div class="icon-skew" style={`background-color:${color}`} />
  </div>
  <div class="name">
    <slot />
  </div>
</div>

<style lang="scss">
  .attr {
    display: inline-flex;
    background-color: rgb(84, 58, 71);
    color: #fff;
    font-size: 16px;
    overflow: hidden;
    border-radius: 5px;
    .icon {
      position: relative;
      width: 30px;
      font-size: 18px;
      text-align: center;
      .icon-skew {
        position: absolute;
        content: "";
        height: 100%;
        width: 10px;
        right: -5px;
        top: 0;
        transform: skewX(-30deg);
      }
    }
    .name {
      margin: 2px 0;
      margin-left: 5px;
      width: 70px;
      text-align: center;
    }
  }
</style>
