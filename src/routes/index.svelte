<script lang="ts">
  import PostTile from '$src/lib/posts/postTile.svelte';
  import { onMount, setContext } from 'svelte';
  import { blogPostsMachine } from '$src/lib/posts/posts';
  import { useMachine } from '@xstate/svelte';
  import type { Post } from '$src/lib/posts/types';
  setContext('posts', {
    getPosts: () => posts,
  });
  let posts: Post[];
  let { state, send } = useMachine(blogPostsMachine);

  onMount(() => {
    if ($state.matches('idle') || $state.matches('error')) send({ type: 'fetchMany' });
  });
</script>

<header class="header-bg">
  <h4 class="header-text">
    I write about all sorts of software things, but mostly devops, rust, cloud, and game dev
  </h4>
</header>

{#if $state.matches('loaded')}
  <section class="posts">
    <h5 class="recent">Recent Blog Posts</h5>
    <div id="post-column">
      {#each $state.context.posts as { frontmatter, slug }}
        <a href={`/blog/${slug}`}>
          <PostTile title={frontmatter.title} excerpt={frontmatter.excerpt ?? ''} />
        </a>
      {/each}
    </div>
  </section>
{:else if $state.matches('error')}
  <h1>Something really bad happened.</h1>
  <h2>You know it's really bad because this whole blog is just a bunch of HTML and CSS files.</h2>
{/if}

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
    padding: 5% 10%;
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
