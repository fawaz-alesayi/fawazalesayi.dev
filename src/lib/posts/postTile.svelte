<script>
  export let title;
  export let excerpt;
</script>

<div class="tile">
  <h4 class="tile-header">{title}</h4>
  <p class="tile-intro">{excerpt}</p>
</div>

<style>
  .tile {
    background-color: #f8f8f8;
    width: 300px;
    height: auto;
    filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
    margin-bottom: 50px;
  }

  .tile:nth-child(even) {
    align-self: flex-end;
  }

  .tile-header {
    padding-top: 10px;
    margin-left: 10%;
    margin-top: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .tile-intro {
    margin-left: 10%;
    font-size: 1.2rem;
    padding-right: 5%;
    padding-bottom: 20px;
  }
</style>
