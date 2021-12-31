<script lang="ts">
  import { navigate, Router } from "svelte-routing";
  import { globalHistory } from "svelte-routing/src/history";
  import Header from "./views/Header.svelte";
  import PoweredBy from "./components/PoweredBy.svelte";
  import { onDestroy, onMount, tick } from "svelte";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import NativeSwiper, { Controller } from "swiper";
  import "swiper/css";
  import Info from "./views/Info.svelte";
  import Project from "./views/Project.svelte";
  import About from "./views/About.svelte";
  import Thanks from "./views/Thanks.svelte";
  import { getOffsetWinHeight, headerMinHeight } from "./store/constants";
  import OpenDialog from "./components/OpenDialog.svelte";
  import getOpenState from "./utils/getOpenState";
  import { writable } from "svelte/store";

  let unsub: Function;
  let actveInfoSlide = "base";
  let currentPath = "/";
  $: showMainContent = currentPath != "" && currentPath != "/";
  let swiperController: NativeSwiper;
  let swichSiperWithPath = (speed = 800) => {
    if (swiperController && typeof swiperController.slideTo === "function") {
      switch (currentPath) {
        case "/me":
          return swiperController.slideTo(0, speed);
        case "/project":
          return swiperController.slideTo(1, speed);
        case "/about":
          return swiperController.slideTo(2, speed);
        case "/thanks":
          return swiperController.slideTo(3, speed);
        default:
          return;
      }
    }
  };
  const setSwiperController = async (e) => {
    const [s] = e.detail;
    await tick();
    swiperController = s;
    swichSiperWithPath(0);
  };
  function getLocationQuery<T extends string>(
    key: string,
    d: T,
    l: Location = location
  ) {
    const qs = new URLSearchParams(location.search);
    return decodeURI(qs.get(key) ?? d);
  }
  onMount(() => {
    currentPath = location.pathname;
    if (currentPath.indexOf("/me") === 0) {
      actveInfoSlide = getLocationQuery("slide", "base", location);
      navigate("/me", {
        replace: true,
      });
    }
    unsub = globalHistory.listen(({ location }) => {
      currentPath = (location as Location).pathname;
      swichSiperWithPath();
    });
  });
  onDestroy(() => {
    unsub();
  });
  $: {
    if (showMainContent === false) {
      actveInfoSlide = "base";
    }
  }
  let dialogOpened = writable(false);
  const openState = getOpenState();
  if (openState === "first") {
    $dialogOpened = true;
  }
</script>

<main class="app">
  <Router>
    <Header {currentPath} />
    {#if showMainContent}
      <Swiper
        style={`height:${getOffsetWinHeight(headerMinHeight)}px`}
        allowTouchMove={false}
        direction="vertical"
        modules={[Controller]}
        controller={{ control: swiperController }}
        on:swiper={setSwiperController}
      >
        <SwiperSlide>
          <div class="view-wrapper">
            <Info slide={actveInfoSlide} />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="view-wrapper">
            <Project />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="view-wrapper">
            <About />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div class="view-wrapper">
            <Thanks />
          </div>
        </SwiperSlide>
      </Swiper>
    {/if}
    <PoweredBy />
    {#if !$dialogOpened}
      <div class="open-building-info" on:click={() => ($dialogOpened = true)}>
        !
      </div>
    {/if}
    <OpenDialog opened={dialogOpened} title="温馨提示" width="30%">
      <div class="building-info">
        <p>网站建设中，目前进度百分之八十</p>
        <p>当前预览版本不代表最终品质</p>
      </div>
    </OpenDialog>
  </Router>
</main>

<style lang="scss">
  @keyframes shaking {
    0% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(5px);
    }
  }
  .app {
    min-width: 1100px;
    .view-wrapper {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      padding-bottom: 18px;
    }
    .building-info {
      font-size: 14px;
      color: #777;
      line-height: 46px;
      margin: 20px 0;
      & > p {
        line-height: 26px;
      }
    }
    .open-building-info {
      position: fixed;
      width: 30px;
      height: 30px;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border: solid 4px rgb(255, 187, 0);
      border-radius: 30px;
      right: 30px;
      bottom: 100px;
      color: rgb(255, 187, 0);
      background-color: #fff;
      animation: shaking 0.5s 0s linear infinite alternate;
      cursor: pointer;
      user-select: none;
      &::before {
        content: "点击打开";
        position: absolute;
        display: none;
        color: #333;
        background-color: #fff;
        white-space: nowrap;
        font-size: 12px;
        font-weight: normal;
        padding: 5px;
        border-radius: 5px;
        border-bottom-right-radius: 0;
        bottom: 30px;
        right: 30px;
      }
      &:hover {
        animation: none;
        &::before {
          display: block;
        }
      }
    }
  }
</style>
