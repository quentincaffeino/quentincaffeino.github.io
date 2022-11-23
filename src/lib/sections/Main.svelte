<script>
  import MailIcon from "svelte-feather-icons/src/icons/MailIcon.svelte";
  import ChevronDownIcon from "svelte-feather-icons/src/icons/ChevronDownIcon.svelte";

  const GH_USERNAME = import.meta.env.VITE_GH_USERNAME;

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
          {@html userData.name?.replace(" ", "&nbsp;")}<span class="text-3xl"
            >,
          </span>
        </h2>

        <h3 class="section-header section-header--2">
          and {userData.bio}
        </h3>

        <div class="flex flex-row flex-wrap justify-center px-3 space-x-4">
          {#if GH_USERNAME}
            <div class="btn">
              <a
                href="https://github.com/{GH_USERNAME}"
                rel="noreferrer noopener external"
                target="_blank"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
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
