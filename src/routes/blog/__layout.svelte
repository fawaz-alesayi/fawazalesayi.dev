<slot />

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
