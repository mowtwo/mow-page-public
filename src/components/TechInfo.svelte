<script lang="ts">
</script>

<div class="tech">
  <h1>Github数据</h1>
  <div class="wrapper">
    <img
      src="https://github-readme-stats.vercel.app/api?username=mowtwo&theme=flag-india&show_icons=true"
      alt="stat"
    />
    <br />
    <img
      src="https://github-readme-stats.vercel.app/api/top-langs/?username=mowtwo&langs_count=10&layout=compact&card_width=495"
      alt="top-lang"
    />
  </div>
  <h1>Github Repo</h1>
  <div class="wrapper">
    <a
      class="repo"
      href="https://github.com/mowtwo/ReScriptReact"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="repo"
        src="https://github-readme-stats.vercel.app/api/pin/?username=mowtwo&repo=ReScriptReact"
        alt="repo"
      />
    </a>
    <a
      class="repo"
      href="https://github.com/mowtwo/ReScriptExpress"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://github-readme-stats.vercel.app/api/pin/?username=mowtwo&repo=ReScriptExpress"
        alt="repo"
      /></a
    >
    <br />
    <a
      class="repo"
      href="https://github.com/mowtwo/mow.danmu.js"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://github-readme-stats.vercel.app/api/pin/?username=mowtwo&repo=mow.danmu.js"
        alt="repo"
      />
    </a>
    <a
      class="repo"
      href="https://github.com/mowtwo/x.jjxz"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://github-readme-stats.vercel.app/api/pin/?username=mowtwo&repo=x.jjxz"
        alt="repo"
      />
    </a>
  </div>
</div>

<style lang="scss">
  .tech {
    position: relative;
    text-align: center;
    h1 {
      font-size: 30px;
      font-weight: bold;
      padding: 25px 0;
    }
    .wrapper {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 80px;
      }
      & > img {
        margin-top: 10px;
        height: 215px;
      }
      .repo {
        // margin-right: 10px;
        & > img {
          margin: 10px;
        }
      }
    }
  }
</style>
