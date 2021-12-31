<script context="module" lang="ts">
  export const skillMapper = [
    {
      text: "前端",
      value: 80,
    },
    {
      text: "后端",
      value: 60,
    },
    {
      text: "小程序",
      value: 60,
    },
    {
      text: "算法",
      value: 10,
    },
    {
      text: "移动开发",
      value: 30,
    },
    {
      text: "嵌入式",
      value: 20,
    },
  ].map((item) => ({
    ...item,
    max: 100,
    min: 0,
  }));
  const inMapper = (key: string) => {
    const i = skillMapper.findIndex((fi) => fi.text === key);
    if (i >= 0) {
      return [true, i] as const;
    } else {
      return [false, -1] as const;
    }
  };
  export const maxInMapper = (key: string) => {
    const [ok, i] = inMapper(key);
    if (!ok) {
      return false;
    }
    return (
      skillMapper[i].value ===
      Math.max(...skillMapper.map(({ value }) => value))
    );
  };
  export const minInMapper = (key: string) => {
    const [ok, i] = inMapper(key);
    if (!ok) {
      return false;
    }
    return (
      skillMapper[i].value ===
      Math.min(...skillMapper.map(({ value }) => value))
    );
  };
</script>

<script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import NativeSwiper, { Controller } from "swiper";
  import InfoGroup from "@/components/InfoGroup.svelte";
  import InfoItem from "@/components/InfoItem.svelte";
  import InfoAttr from "@/components/InfoAttr.svelte";
  import InfoDescTitlePanel from "@/components/InfoDescTitlePanel.svelte";
  import InfoCardPanel from "@/components/InfoCardPanel.svelte";
  import "@carbon/charts/styles.min.css";
  import "carbon-components/css/carbon-components.min.css";
  import RadarECharts from "@/components/RadarECharts.svelte";
  import type { InfoNavItem, RadarOption } from "@/global";
  import InfoRate from "@/components/InfoRate.svelte";
  import resolveClass from "@/utils/resolveClass";
  import { tick } from "svelte";

  export let slide: string = "";

  let radarOptions: RadarOption = {
    radar: [
      {
        indicator: skillMapper.map(({ value: _, ...other }) => other),
        axisName: {
          fontSize: 16,
          color: "#000",
          formatter(params, ind) {
            if (maxInMapper(params)) {
              ind.nameTextStyle.color = "#d63840";
            } else if (minInMapper(params)) {
              ind.nameTextStyle.color = "#288de3";
            }
            return params;
          },
        },
        axisNameGap: 10,
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitArea: {
          areaStyle: {
            color: ["#bbb"],
          },
        },
      },
    ],
    series: [
      {
        name: "技术方向熟练度",
        type: "radar",
        symbol: "none",
        lineStyle: {
          color: "none",
        },
        areaStyle: {
          color: "#8875af",
        },
        data: [
          {
            value: skillMapper.map(({ value }) => value),
            name: "技术方向熟练度",
            label: {
              show: true,
              formatter(item) {
                return item.value.toString();
              },
            },
          },
        ],
      },
    ],
  };
  const navs: InfoNavItem[] = [
    {
      key: "base",
      icon: "person",
      name: "基础信息",
    },
    {
      key: "tech-level",
      icon: "leidatu",
      name: "技术方向熟练度",
    },
    {
      key: "description",
      icon: "description",
      name: "其他信息",
    },
  ];
  let swiperController: NativeSwiper;
  const swichSiper = (speed = 800) => {
    if (!swiperController) {
      return;
    }
    switch (slide) {
      case "tech-level":
        return swiperController.slideTo(1, speed);
      case "description":
        return swiperController.slideTo(2, speed);
      default:
        return swiperController.slideTo(0, speed);
    }
  };
  const setSwiperController = async (e) => {
    const [s] = e.detail;
    await tick();
    swiperController = s;
    swichSiper(0);
  };
  const upateSlide = () => {
    switch (swiperController.activeIndex) {
      case 1:
        return (slide = "tech-level");
      case 2:
        return (slide = "description");
      default:
        return (slide = "base");
    }
  };
</script>

<div class="view">
  <div class="wrapper">
    <div class="left">
      <div class="nav">
        {#each navs as { key, icon, name }}
          <div
            class="item"
            class:active={key === slide}
            on:click={() => {
              slide = key;
              swichSiper();
            }}
          >
            <i class={resolveClass("iconfont", "icon-" + icon)} title={name} />
          </div>
        {/each}
      </div>
      <Swiper
        spaceBetween={50}
        modules={[Controller]}
        controller={{ control: swiperController }}
        on:swiper={setSwiperController}
        on:slideChange={upateSlide}
      >
        <SwiperSlide>
          <InfoGroup>
            <InfoItem name="ID">1</InfoItem>
            <InfoItem name="昵称">Mowtwo</InfoItem>
            <InfoItem name="简称">M2</InfoItem>
            <InfoItem name="属性">
              <InfoAttr icon="daimawenjian" color="rgb(146,103,245)">
                程序员
              </InfoAttr>
              <InfoAttr icon="xiaochiba" color="rgb(40,195,193)">吃货</InfoAttr>
            </InfoItem>
          </InfoGroup>
          <InfoGroup>
            <InfoItem name="在职状态">在职，寻找机会</InfoItem>
            <InfoItem name="岗位">前端开发工程师</InfoItem>
            <InfoItem name="工作经验">1年</InfoItem>
          </InfoGroup>
          <InfoGroup>
            <InfoItem name="毕业院校">阳光学院</InfoItem>
            <InfoItem name="学历">本科</InfoItem>
            <InfoItem name="专业">计算机科学与技术</InfoItem>
            <InfoDescTitlePanel key="学位" name="工科学士">
              工学学士为学士学位的一种，学士学位由国务院授权高等学校授予。
              <br />
              学习课程包括：计算机组成原理，计算机接口技术，网络工程，汇编语言等专业课程。
            </InfoDescTitlePanel>
          </InfoGroup>
        </SwiperSlide>
        <SwiperSlide>
          <InfoGroup>
            <InfoCardPanel>
              <div class="fix-skill-chart">
                <RadarECharts options={radarOptions} />
              </div>
            </InfoCardPanel>
          </InfoGroup>
          <InfoGroup>
            <InfoItem name="JavaScript">
              <InfoRate level={8} />
            </InfoItem>
            <InfoItem name="Typescript">
              <InfoRate level={8} />
            </InfoItem>
            <InfoItem name="SCSS">
              <InfoRate level={6} />
            </InfoItem>
            <InfoItem name="Pug">
              <InfoRate level={7} />
            </InfoItem>
          </InfoGroup>
          <InfoGroup>
            <InfoItem name="Go">
              <InfoRate level={2} />
            </InfoItem>
            <InfoItem name="C#">
              <InfoRate level={3} />
            </InfoItem>
          </InfoGroup>
          <InfoGroup>
            <InfoItem name="Rust">
              <InfoRate level={1} />
            </InfoItem>
          </InfoGroup>
        </SwiperSlide>
        <SwiperSlide>
          <InfoGroup>
            <InfoItem name="家乡">福建省平潭综合试验区</InfoItem>
            <InfoItem name="现在所在地">福建省厦门市</InfoItem>
            <InfoItem name="期望工作城市">上海/杭州/深圳/厦门</InfoItem>
          </InfoGroup>
          <InfoGroup>
            <InfoItem name="爱好-影视">漫威系列</InfoItem>
            <InfoItem name="爱好-游戏">风暴英雄，LOL，宝可梦</InfoItem>
          </InfoGroup>
          <InfoGroup>
            <InfoCardPanel height={300}>
              <div class="text-description">
                <p><span>随和</span>的性格。</p>
                <p>
                  农历1998年5月初5，<br />出生在福建省的一个小海岛县城
                  <span>平潭县</span>。
                </p>
                <p>
                  2021年7月1日从<span>阳光学院</span>毕业后，先是在<span
                    >福州</span
                  >工作半年，
                  <br />
                  后来到<span>厦门</span>，目前仍在<span>厦门</span>从事<span
                    >前端开发工程师</span
                  >工作。
                </p>
                <p>
                  自学前端开发<span>五年</span>，实际开发经验<span
                    >超过三年</span
                  >（含在校工作室/实习经历等）
                </p>
                <p>喜欢吃东西和写代码。</p>
                <p>看特摄还有漫威，偶尔看点日漫。</p>
                <p>关注电竞，不过不是重度游戏玩家。</p>
              </div>
            </InfoCardPanel>
          </InfoGroup>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="right">
      <div class="top">
        <div class="name">Mowtwo</div>
        <div class="age">23</div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @keyframes move {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .view {
    position: relative;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    background-image: linear-gradient(
      30deg,
      #fff,
      rgb(204, 107, 228),
      rgb(104, 250, 230)
    );
    background-size: 400% 400%;
    animation: move 15s ease infinite;
    &::before {
      content: "";
      position: absolute;
      width: 9000px;
      height: 9000px;
      background-color: rgb(206, 40, 27);
      border-right: solid 150px rgb(181, 33, 23);
      right: 50%;
      transform-origin: top right;
      transform: rotate(15deg);
    }
    &::after {
      content: "</>";
      font-weight: bold;
      color: rgba(255, 255, 255, 0.5);
      font-size: 150px;
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
    .wrapper {
      position: relative;
      z-index: 3;
      display: flex;
      .left {
        flex: 1;
        overflow: hidden;
        .nav {
          height: 70px;
        }
      }
      .right {
        flex: 1;
        position: relative;
        .top {
          position: absolute;
          right: 0;
          top: 30px;
          display: flex;
          align-items: center;
          background-color: #000;
          width: 400px;
          height: 40px;
          font-size: 16px;
          color: #fff;
          &::before {
            content: "";
            position: absolute;
            width: 40px;
            height: 100%;
            background-color: #000;
            left: -20px;
            top: 0;
            transform: skewX(-30deg);
          }
          .name {
            margin-left: 40px;
          }
          .age {
            margin-left: 60px;
            &::after {
              content: "岁";
            }
          }
        }
      }
    }
    .text-description {
      line-height: 26px;
      span {
        color: rgb(0, 132, 255);
      }
      p {
        margin: 10px 0;
      }
    }
    .fix-skill-chart {
      height: 300px;
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: center;
      .item {
        padding: 0 20px;
        color: #fff;
        cursor: pointer;
        transition: all 0.1s linear;
        .iconfont {
          font-size: 28px;
        }
        &:hover {
          transform: scale(1.1);
        }
        &.active {
          transform: scale(1.3);
          color: #333;
        }
      }
    }
  }
</style>
