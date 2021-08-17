<script lang="ts" context="module">
  import type { LoadOutput, LoadInput } from '@sveltejs/kit';
  export async function load({ page }: LoadInput): Promise<LoadOutput> {
    return {
      status: 200,
      props: {
        path: page.path,
      },
    };
  }
</script>

<script lang="ts">
  export let path: string;

  const excludedPaths = ['/blog'];
</script>

{#if excludedPaths.includes(path)}
  <slot />
{:else}
  <header class="header-bg">
    <h4 class="header-text">
      <a href="/blog"> return; </a>
    </h4>
  </header>

  <div id="container">
    <article id="content">
      <slot />
    </article>
  </div>

  <style>
    <style > #container {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    #content {
      box-sizing: inherit;
      width: 100%;
      margin: 0px auto;
      max-width: 800px;
      padding: 20px 40px 40px;
      text-align: start;
    }

    @media (max-width: 767px) {
      #content {
        padding: 20px;
      }
    }

    .header-bg {
      background-color: #ee5922;
      height: 50px;
      width: 100%;
    }

    .header-text {
      margin-top: auto;
      margin-bottom: auto;
      font-family: monospace;
      color: #f8f8f8;
      font-weight: bold;
      text-align: center;
    }

    a {
      text-decoration: none;
      color: black;
    }
  </style>
{/if}

<style>
  /* Global Styles */
  :global(body),
  :global(html) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    word-break: break-word;
  }

  :global(html) {
    /* font-size: 87.5%; */
    font-size: 120%;
    text-rendering: optimizelegibility;
    overflow-x: hidden;
    overflow-y: auto !important;
  } /*14px*/

  :global(body) {
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    line-height: 1.75;
    color: #000000;
    width: 100%;
    min-height: 100vh;
  }

  :global(p) {
    margin-bottom: 1rem;
  }

  :global(h1),
  :global(h2),
  :global(h3),
  :global(h4),
  :global(h5) {
    margin: 3rem 0 1.38rem;
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    line-height: 1.3;
  }

  :global(h1) {
    margin-top: 0;
    font-size: 4.209rem;
  }

  :global(h2) {
    font-size: 3.157rem;
  }

  :global(h3) {
    font-size: 2.369rem;
  }

  :global(h4) {
    font-size: 1.777rem;
  }

  :global(h5) {
    font-size: 1.333rem;
  }

  :global(small),
  :global(.text_small) {
    font-size: 0.75rem;
  }
</style>
