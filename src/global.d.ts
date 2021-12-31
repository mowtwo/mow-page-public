/// <reference types="svelte" />
/// <reference types="echarts"/>
import type { SvelteComponent } from "svelte";
import { ComposeOption } from "echarts"
import type {
  RadarSeriesOption
} from "echarts/charts";
import type {
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption,
  RadarComponentOption
} from "echarts/components"


export interface NavItem {
  text: string;
  link: string;
  icon?: string;
}

export interface InfoPage {
  key: string
  Component: SvelteComponentConstructor
}

export type RadarOption = ComposeOption<
  | RadarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | RadarComponentOption
>;

export type OpenedState = 'first' | 'other'

export interface InfoNavItem {
  key: string
  icon: string
  name: string
}