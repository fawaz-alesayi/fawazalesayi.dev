import { assign } from 'xstate';
import { createMachine } from 'xstate';
import type { Post } from './types';

// The events that the machine handles
type FetchEvent = { type: 'fetchMany' } | { type: 'fetchOne'; slug: string };

// The context (extended state) of the machine
interface BlogContext {
  posts: Post[];
  currentPost: Partial<Post>;
}

export const blogPostsMachine = createMachine<BlogContext, FetchEvent>({
  id: 'posts',
  context: {
    posts: [],
    currentPost: {},
  },
  initial: 'idle',
  states: {
    idle: {
      type: 'atomic',
      on: {
        fetchMany: { target: 'fetchingMany' },
        fetchOne: { target: 'fetchingOne' },
      },
    },
    fetchingMany: {
      invoke: {
        id: 'fetchPosts',
        src: (_context, _event) => _fetchPosts(),
        onDone: {
          target: 'loaded',
          actions: assign({ posts: (_context, event) => event.data }),
        },
        onError: {
          target: 'error',
        },
      },
    },
    fetchingOne: {
      invoke: {
        id: 'fetchPost',
        src: async (_context, event) => {
          if (event.type === 'fetchOne') {
            return (await _fetchPost(event.slug));
          }
        },
        onDone: {
          target: 'loaded',
          actions: assign({
            currentPost: (_context, event) => {
              return event.data;
            },
          }),
        },
        onError: {
          target: 'error',
        },
      },
    },
    error: {
      type: 'atomic',
      on: {
        fetchMany: { target: 'fetchingMany' },
        fetchOne: { target: 'fetchingOne' },
      },
    },
    loaded: {
      type: 'final',
    },
  },
});

async function _fetchPosts(): Promise<Partial<Post>[]> {
  try {
    const res = await fetch('http://localhost:3000/index.json');
    const data: Partial<Post>[] = await res.json();
    return data;
  } catch (err) {
    Promise.reject(err);
  }
}


export async function _fetchPost(slug: string): Promise<Partial<Post> | undefined> {
  const res = await fetch(`/posts/${slug}.json`);
  const data = await res.json();
  return data;
}
