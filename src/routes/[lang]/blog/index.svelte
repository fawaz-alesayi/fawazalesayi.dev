<script lang="ts">
  import PostTile from '$src/lib/posts/postTile.svelte';
  import { t } from '$lib/translations';

  import type { lang, PostFrontMatter } from '$src/lib/posts/types';

  export let metadata: PostFrontMatter[];
  export let language: lang;
</script>

<header class="header-bg">
  <h4 class="header-text">
    Hi, I'm Fawaz. <br />I write about all sorts of programming things
  </h4>
</header>

<section class="posts">
  <h5 class="recent">{$t('index.recent')}</h5>
  <div id="post-column">
    {#each metadata as { title, slug, excerpt }}
      <a href={`blog/${slug}/${language}`}>
        <PostTile {title} excerpt={excerpt ?? ''} dir={language == 'ar' ? 'rtl' : 'ltr'} />
      </a>
    {/each}
  </div>
</section>

<svelte:head>
  <title>Fawaz Alesayi</title>
</svelte:head>

<style>
  .header-bg {
    background-color: #ee5922;
    height: auto;
    width: 100vw;
  }

  .header-text {
    margin: 0;
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
    padding: 3vh 5vw;
    line-height: 1.5;
    color: #f8f8f8;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .recent {
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
      'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  #post-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (min-width: 768px) {
    #post-column {
      width: 500px;
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
    }
  }

  a {
    display: block;
    text-decoration: none;
  }
</style>
