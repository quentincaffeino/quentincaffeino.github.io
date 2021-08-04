<script>
  import Github from "simple-icons/icons/github.js";
  import { MailIcon } from "svelte-feather-icons";
</script>

<div class="section-body">
  <div
    class="flex flex-col items-center max-w-full min-w-[75%] sm:flex-row h-full max-h-[50%] absolute top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2 iphone5:static iphone5:mt-4 iphone5:translate-y-0 iphone5:translate-x-0"
  >
    <div class="">
      <img
        src="https://avatars.githubusercontent.com/u/2855777?v=4"
        alt="Sergei ZH"
        class="rounded-full max-h-52 max-w-52"
      />
    </div>

    <div class="text-center sm:text-left">
      <h2 class="section-header section-header--1">Sergei ZH</h2>
      <h3 class="section-header section-header--2">Full-stack developer</h3>

      <div
        class="flex flex-row flex-wrap justify-center px-3 space-x-4 sm:justify-start"
      >
        <div class="btn">
          <a
            href="https://github.com/quentincaffeino"
            rel="noreferrer noopener"
            target="_blank"
          >
            {@html Github.svg}
          </a>
        </div>

        <div class="">
          <a href="mailto:sergey95zu@gmail.com">
            <MailIcon size="22" />
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .btn :global(svg) {
    width: 22px;
    height: 22px;
  }
</style>
