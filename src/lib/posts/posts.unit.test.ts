import {blogPostsMachine} from './posts'
describe('Given a a postMachine with an initial state of \'idle\'', () => {
    expect(blogPostsMachine.initialState.value).toMatch('idle')
    describe('When a FETCH transition happens', () => {
        const newState = blogPostsMachine.transition('fetching', {type: 'fetchOne'})
        test('The new state should be FETCHING', () => {
            expect(newState.value).toMatch('fetchingOne');
        })
    })
})