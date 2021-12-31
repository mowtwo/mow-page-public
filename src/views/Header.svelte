<script lang="ts">
  import FooterNav from "@/components/FooterNav.svelte";
  import HeaderNav from "@/components/HeaderNav.svelte";
  import type { NavItem } from "@/global";
  import resolveClass from "@/utils/resolveClass";
  import { fade, fly } from "svelte/transition";
  import { Link } from "svelte-routing";

  export let currentPath: string = "/";
  $: miniMode = currentPath !== "" && currentPath !== "/";

  let toggleHello = false;
  const topNavList: NavItem[] = [
    {
      text: "知乎",
      link: "https://www.zhihu.com/people/mowtwo",
      icon: "./images/link.png",
    },
    {
      text: "掘金",
      link: "https://juejin.cn/user/3518891308365982",
      icon: "./images/link.png",
    },
    {
      text: "Github",
      link: "https://github.com/mowtwo",
      icon: "./images/link.png",
    },
  ];
  let showHeaderRight = false;
  let openFooter = false;
  const bottomNavList: NavItem[] = [
    {
      text: "M2的图鉴",
      link: "/me",
    },
    {
      text: "项目展示",
      link: "/project",
    },
    {
      text: "关于本站",
      link: "/about",
    },
    {
      text: "鸣谢",
      link: "/thanks",
    },
  ];
  $: footerNavActive = bottomNavList.findIndex((fi) => fi.link === currentPath);
</script>

<div class={resolveClass("top", miniMode ? "mini" : "")}>
  <img class="bg" src="./images/bg.jpg" alt="bg" />
  <div class="mask">
    <div
      class="header"
      on:mouseenter={() => (showHeaderRight = true)}
      on:mouseleave={() => (showHeaderRight = false)}
    >
      <div class="left">
        <Link to="/">
          <span class="link-bottom-border">
            <img src="./favicon.png" alt="logo" class="logo" />
            MowTwo
          </span>
        </Link>
      </div>
      {#if showHeaderRight && !miniMode}
        <div class="right" in:fly={{ y: 10 }} out:fly={{ y: -10 }}>
          <HeaderNav navList={topNavList} />
          <a
            href="https://github.com/mowtwo/page"
            rel="noopener noreferrer"
            class="repo-github"
            title="查看源码"
          >
            <img src="./images/github.svg" alt="github" />
          </a>
        </div>
      {/if}
    </div>
    <div class="middle">
      <div class="wrapper">
        <div
          id="MowTwo"
          on:mouseenter={() => (toggleHello = true)}
          on:mouseleave={() => (toggleHello = false)}
        >
          {#if toggleHello}
            <span in:fade out:fly={{ y: -80 }} class="text"> M2的世界 </span>
          {:else}
            <span in:fade out:fly={{ y: -20 }} class="text"> 看这里! </span>
          {/if}
          <span class="link">
            <Link to="/me">
              <span class="link-bottom-border">了解更多</span>
            </Link>
          </span>
          <!-- <a href="#blog" class="link link-bottom-border">了解更多</a> -->
        </div>
      </div>
    </div>
    <div class={resolveClass("footer", openFooter ? "open" : "")}>
      <!-- <div
        class="open-icon"
        on:click={() => (openFooter = !openFooter)}
        title={openFooter ? "收起" : "展开"}
      /> -->
      <div class="nav">
        <FooterNav navList={bottomNavList} activeIndex={footerNavActive} />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @keyframes fufu {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.2;
    }
  }
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: all 0.4s linear;
    &.mini {
      position: sticky;
      top: 0;
      width: 100%;
      height: 60px;
      .mask {
        flex-direction: row;
        background-color: rgba($color: #000000, $alpha: 0.6);
        transition: all 0.6s 0.3s;
        .header {
          height: 60px;
          background: rgba($color: #000000, $alpha: 0);
          transition: all 0.3s 0.3s linear;
          &:hover {
            background: rgba($color: #000000, $alpha: 0);
          }
          .left {
            & > :global(a) {
              color: #fff;
            }
          }
          .right {
            display: none;
          }
          &::after {
            display: none;
          }
        }
        .footer {
          background-color: rgba($color: #000000, $alpha: 0);
          transition: none;
          .open-icon {
            display: none;
          }
          .nav {
            margin-top: 20px;
            text-align: right;
          }
        }
      }
      .middle {
        display: none;
      }
    }
    & > .bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .header {
        width: 100%;
        height: 60px;
        min-height: 60px;
        position: relative;
        transition: all 0.6s ease;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba($color: #000000, $alpha: 0);
        .left {
          margin-left: 20px;
          .link-bottom-border {
            display: flex;
            align-items: center;
          }
          & > :global(a) {
            color: rgba($color: #fff, $alpha: 0);
            font-weight: bold;
            transition: all 0.3s ease;
            font-size: 20px;
            text-decoration: none;
          }
          .logo {
            transition: all 0.6s ease;
            height: 30px;
            margin-right: 10px;
          }
        }
        .right {
          margin-right: 40px;
          display: flex;
          align-items: center;
          .repo-github {
            margin-left: 20px;
            display: inline-block;
            width: 34px;
            height: 34px;
            background-color: #fff;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: solid 4px #000;
            & > img {
              width: calc(100% - 6px);
              height: calc(100% - 6x);
              object-fit: cover;
            }
          }
        }
        &:hover {
          height: 60px;
          background: rgba($color: #000000, $alpha: 0.4);
          &::after {
            right: -20px;
          }
          .left {
            & > :global(a) {
              color: rgba($color: #fff, $alpha: 1);
            }
          }
        }
        &::after {
          content: "";
          position: absolute;
          z-index: 3;
          width: 20px;
          height: 20px;
          box-sizing: border-box;
          border: solid 5px rgba($color: #fff, $alpha: 0.5);
          border-radius: 20px;
          right: 20px;
          top: 50%;
          opacity: 1;
          transition: right 0.3s ease;
          transform: translateY(-50%);
          animation: fufu 1.6s 0s linear infinite alternate;
        }
      }
      .middle {
        width: 100%;
        flex: 1;
        overflow: hidden;
        position: relative;
        overflow: hidden;
        .wrapper {
          width: 580px;
          height: 300px;
          position: absolute;
          top: 50%;
          left: 50%;
        }
        #MowTwo {
          width: 580px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba($color: #000000, $alpha: 0.6);
          font-size: 120px;
          color: #fff;
          font-weight: bold;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          transform: translate(-50%, -50%);
          user-select: none;
          transition: all 0.3s ease;
          .text {
            position: absolute;
          }
          &:hover {
            // background-color: rgba($color: #000000, $alpha: 0.8);
            .link {
              opacity: 1;
            }
          }
          .link {
            position: absolute;
            text-decoration: none;
            cursor: pointer;
            font-size: 20px;
            right: 10px;
            bottom: 20px;
            font-weight: normal;
            opacity: 0;
            transition: opacity 0.3s 0.6s ease;
            & > :global(a) {
              color: #fff;
              text-decoration: none;
            }
          }
        }
      }
      .footer {
        width: 100%;
        height: 60px;
        background-color: rgba($color: #000000, $alpha: 0.2);
        transition: all 0.6s ease;
        position: relative;
        overflow: hidden;
        .open-icon {
          position: absolute;
          width: 20px;
          height: 10px;
          background-repeat: no-repeat;
          background-size: 20px 20px;
          background-position: center 0;
          background-image: url(../images/open.png);
          top: 10px;
          z-index: 1;
          left: 50%;
          transform: translateX(-50%);
          transition: all 0.8s ease;
          cursor: pointer;
          &:active {
            opacity: 0.6;
          }
        }
        .nav {
          text-align: center;
          margin-top: 30px;
        }
        &.open {
          background-color: rgba($color: #000000, $alpha: 0.6);
          height: 160px;
          .open-icon {
            background-position: center -10px;
          }
        }
      }
    }
  }

  a {
    text-decoration: none;
  }

  .link-bottom-border {
    position: relative;
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
