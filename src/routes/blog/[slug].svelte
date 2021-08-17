<script lang="ts" context="module">
  import type { LoadOutput } from '@sveltejs/kit';

  // if someone reached this page, then the post does not exist.
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load(): Promise<LoadOutput> {
    return {
      status: 403,
    };
  }
</script>
