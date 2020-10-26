import React from 'react'
import { mount } from 'enzyme'
import { Window } from 'components'

describe('Window', () => {
    it('should render correctly', () => {
        const wrapper = mount(<Window>body</Window>);
        expect(wrapper.html()).toMatchSnapshot()
        expect(() => wrapper.unmount()).not.toThrow();
    })
    it('should support title', () => {
        const wrapper = mount(<Window title="Title">body</Window>);
        expect(wrapper.html()).toMatchSnapshot()
        expect(() => wrapper.unmount()).not.toThrow();
    })
    it('should support url', () => {
        const wrapper = mount(<Window url="react.geist-ui.dev" >body</Window>);
        expect(wrapper.html()).toMatchSnapshot()
        expect(() => wrapper.unmount()).not.toThrow();
    })
    it('should support tabs', () => {
        const wrapper = mount(<Window tabs={[
            {
                title: 'index.js',
                value: 'index',
            },
            {
                title: 'about.js',
                value: 'about',
            },
        ]}
                                      selected="index">body</Window>);
        expect(wrapper.html()).toMatchSnapshot()
        expect(() => wrapper.unmount()).not.toThrow();
    })
    it('support width headerWidth height props', () => {
        const wrapper = mount(<Window headerHeight="48px" height={360} width={480}>body</Window>);
        expect(wrapper.html()).toMatchSnapshot()
        expect(() => wrapper.unmount()).not.toThrow();
    })
})
