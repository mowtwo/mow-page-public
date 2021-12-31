<script lang="ts">
  import * as echarts from "echarts/core";
  import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
  import { RadarChart } from "echarts/charts";
  import {
    GridComponent,
    TooltipComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent,
    RadarComponent,
  } from "echarts/components";
  import { LabelLayout, UniversalTransition } from "echarts/features";
  import { onDestroy, onMount, tick } from "svelte";
  import type { RadarOption } from "@/global";

  type ChartsRender = "canvas" | "svg";

  export let render: ChartsRender = "canvas";
  export let options: RadarOption = {};

  function initUse() {
    const components: Parameters<typeof echarts.use>[0] = [
      TooltipComponent,
      GridComponent,
      DatasetComponent,
      TransformComponent,
      LabelLayout,
      UniversalTransition,
      LegendComponent,
      RadarComponent,
      RadarChart,
    ];
    if (render === "svg") {
      components.push(SVGRenderer);
    } else {
      components.push(CanvasRenderer);
    }
    echarts.use(components);
  }

  function initOptions(): RadarOption {
    return {
      ...options,
    };
  }

  let charts: echarts.ECharts = null;
  let chartsDom: HTMLDivElement = null;

  function resizeHandle() {
    charts?.resize();
  }
  onMount(async () => {
    initUse();
    charts = echarts.init(chartsDom);
    await tick();
    charts.setOption(initOptions());
  });
</script>

<svelte:window on:resize={resizeHandle} />
<div class="charts" bind:this={chartsDom} />

<style lang="scss">
  .charts {
    height: 100%;
  }
</style>
