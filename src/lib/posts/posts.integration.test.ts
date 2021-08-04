import { blogPostsMachine } from './posts'
import { interpret } from 'xstate'

describe('Given a postService', () => {
    it('should eventually reach "loaded"', done => {
        const postService = interpret(blogPostsMachine).onTransition((state) => {
          if (state.matches('loaded')) {
            expect(state.context.posts.length).not.toEqual(0);
            done();
          }
        });
      
        postService.start();
      
        // send zero or more events to the service that should
        // cause it to eventually reach its expected state
        postService.send('fetchMany');
      });
})