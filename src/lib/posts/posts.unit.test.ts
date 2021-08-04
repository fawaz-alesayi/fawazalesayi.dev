import {blogPostsMachine} from './posts'
describe('Given a a postMachine with an initial state of \'idle\'', () => {
    expect(blogPostsMachine.initialState.value).toMatch('idle')
    describe('When a FETCH transition happens', () => {
        // does not trigger side effects
        const newState = blogPostsMachine.transition('idle', 'fetchOne')
        test('The new state should be FetchingOne', () => {
            expect(newState.value).toMatch('fetchingOne');
        })
    })
})

describe('Given a a postMachine with an initial state of \'idle\'', () => {
    expect(blogPostsMachine.initialState.value).toMatch('idle')
    describe('When a fetchMany transition happens', () => {
        // does not trigger side effects
        const newState = blogPostsMachine.transition('idle', 'fetchMany')
        test('The new state should be fetchingMany', () => {
            expect(newState.value).toMatch('fetchingMany');
        })
    })
})