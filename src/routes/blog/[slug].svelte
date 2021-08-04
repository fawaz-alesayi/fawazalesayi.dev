<script lang="ts" context="module">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  // if someone reached this page, then the post does not exist.
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    return {
      status: 404,
    };
  }
</script>
