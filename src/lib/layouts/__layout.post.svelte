<script>
  export let title;
  export let creationDate;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header class="header-bg">
  <h4 class="header-text">
    <a href="/blog"> return; </a>
  </h4>
</header>

<div id="container">
  <article id="content">
    <h2>{title}</h2>
    <slot />
    <em>Posted on {creationDate}</em>
  </article>
</div>

<style>
  #container {
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
