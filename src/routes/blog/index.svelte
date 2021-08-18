<script lang="ts" context="module">
  import PostTile from '$src/lib/posts/postTile.svelte';
  import type { PostFrontMatter, lang } from '$src/lib/posts/types';
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }: LoadInput): Promise<LoadOutput> {
    const url = `/blog/endpoint.json`;
    const res = await fetch(url);
    let posts = await res.json();

    if (res.ok) {
      return {
        props: {
          posts: posts.metadata,
          language: posts.lang,
        },
      };
    }
    
    return {}
  }
</script>

<script lang="ts">
  export let posts: PostFrontMatter[];
  export let language: lang;
</script>

<header class="header-bg">
  <h4 class="header-text">
    Hi, I'm Fawaz. <br />I write about all sorts of software things, but mostly devops, rust, and
    cloud.
  </h4>
</header>

<section class="posts">
  <h5 class="recent">Recent Blog Posts</h5>
  <div id="post-column">
    {#each posts as { title, slug, excerpt }}
      <a href={`/blog/${slug}/${language}`}>
        <PostTile {title} excerpt={excerpt ?? ''} />
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
  }

  @media only screen and (min-width: 600px) {
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

  a:nth-child(even) {
    align-self: flex-end;
  }
</style>
