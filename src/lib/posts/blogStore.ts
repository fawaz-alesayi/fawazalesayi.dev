import { blogPostsMachine } from '$src/lib/posts/posts';
import { useMachine } from '@xstate/svelte';

export const { state, send, service } = useMachine(blogPostsMachine);
