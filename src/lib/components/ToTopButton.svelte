<script>
  import ChevronUpIcon from "svelte-feather-icons/src/icons/ChevronUpIcon.svelte";
</script>

<div class="sticky z-20 flex flex-col float-right w-1/4 bottom-4">
  <div class="self-end inline-block">
    <a
      href="#"
      onclick="event.preventDefault();window.scrollTo(0,0);setTimeout(()=>document.body.focus(),500);"
      rel="external"
      class="block p-2 text-gray-600 bg-white border rounded-full shadow-xl fill-current animate__animated--bounce"
    >
      <ChevronUpIcon size="2x" />
    </a>
  </div>
</div>

<style>
  /* Taken from animate.css library */
  :root {
    --animate-duration: 0.5s;
    --animate-repeat: 1;
  }

  .animate__animated--bounce:focus {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-duration: var(--animate-duration);
    animation-duration: var(--animate-duration);
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;

    -webkit-animation-name: bounce;
    animation-name: bounce;
    transform-origin: center bottom;
  }

  @media print, (prefers-reduced-motion: reduce) {
    .animate__animated--bounce {
      -webkit-animation-duration: 1ms !important;
      animation-duration: 1ms !important;
      -webkit-transition-duration: 1ms !important;
      transition-duration: 1ms !important;
      -webkit-animation-iteration-count: 1 !important;
      animation-iteration-count: 1 !important;
    }

    .animate__animated--bounce[class*="Out"] {
      opacity: 0;
    }
  }

  @-webkit-keyframes bounce {
    from,
    20%,
    53%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -30px, 0) scaleY(1.1);
      transform: translate3d(0, -30px, 0) scaleY(1.1);
    }

    70% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -15px, 0) scaleY(1.05);
      transform: translate3d(0, -15px, 0) scaleY(1.05);
    }

    80% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
      transform: translate3d(0, 0, 0) scaleY(0.95);
    }

    90% {
      -webkit-transform: translate3d(0, -4px, 0) scaleY(1.02);
      transform: translate3d(0, -4px, 0) scaleY(1.02);
    }
  }
  @keyframes bounce {
    from,
    20%,
    53%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -30px, 0) scaleY(1.1);
      transform: translate3d(0, -30px, 0) scaleY(1.1);
    }

    70% {
      -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      -webkit-transform: translate3d(0, -15px, 0) scaleY(1.05);
      transform: translate3d(0, -15px, 0) scaleY(1.05);
    }

    80% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      -webkit-transform: translate3d(0, 0, 0) scaleY(0.95);
      transform: translate3d(0, 0, 0) scaleY(0.95);
    }

    90% {
      -webkit-transform: translate3d(0, -4px, 0) scaleY(1.02);
      transform: translate3d(0, -4px, 0) scaleY(1.02);
    }
  }
</style>
