<script>
  import { svg as githubSvg } from "simple-icons/icons/github.js";
  import MailIcon from "svelte-feather-icons/src/icons/MailIcon.svelte";
  import ChevronDownIcon from "svelte-feather-icons/src/icons/ChevronDownIcon.svelte";

  const ghUsername = import.meta.env.VITE_GH_USERNAME;

  export let userData;
</script>

<div class="section-body">
  <div
    class="absolute flex flex-col w-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 iphone5:static iphone5:mt-4 iphone5:translate-y-0 iphone5:translate-x-0"
  >
    <div class="flex flex-col items-center h-full max-h-[50%] ">
      <div class="">
        <img
          src={userData.avatar_url}
          alt="Sergei ZH"
          class="rounded-full max-h-52 max-w-52"
        />
      </div>

      <div class="text-center">
        <h2 class="section-header section-header--1">
          <span class="text-3xl">Hi! I'm</span>
          {@html userData.name.replace(" ", "&nbsp;")}<span class="text-3xl"
            >,
          </span>
        </h2>

        <h3 class="section-header section-header--2">
          and {userData.bio}
        </h3>

        <div class="flex flex-row flex-wrap justify-center px-3 space-x-4">
          {#if ghUsername}
            <div class="btn">
              <a
                href="https://github.com/{ghUsername}"
                rel="noreferrer noopener"
                target="_blank"
              >
                {@html githubSvg}
              </a>
            </div>
          {/if}

          <div class="">
            <a href="mailto:sergey95zu@gmail.com">
              <MailIcon size="22" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <a
      rel="external"
      href="#projects"
      onclick="event.preventDefault();document.querySelector(this.getAttribute('href')).scrollIntoView()"
      class="flex justify-center mt-6 fill-current text-theme"
    >
      <ChevronDownIcon size="2x" />
    </a>
  </div>
</div>

<style>
  .btn :global(svg) {
    width: 22px;
    height: 22px;
  }
</style>
