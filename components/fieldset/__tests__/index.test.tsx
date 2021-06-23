import React from 'react'
import { mount, render } from 'enzyme'
import { Fieldset } from 'components'

describe('Fieldset', () => {
  it('should mount correctly', () => {
    const wrapper = mount(
      <Fieldset>
        <Fieldset.Title>title</Fieldset.Title>
        <Fieldset.Subtitle>subtitle</Fieldset.Subtitle>
        <Fieldset.Footer>
          status
          <button>Actions</button>
        </Fieldset.Footer>
      </Fieldset>,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correctly', () => {
    const wrapper = render(
      <Fieldset>
        <Fieldset.Title>title</Fieldset.Title>
        <Fieldset.Subtitle>subtitle</Fieldset.Subtitle>
        <Fieldset.Footer>
          status
          <button>Actions</button>
        </Fieldset.Footer>
      </Fieldset>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('the component Fieldset.Content should be injected automatically', () => {
    const fieldset = mount(
      <Fieldset>
        <Fieldset.Title>test-title</Fieldset.Title>
        <Fieldset.Subtitle>test-subtitle</Fieldset.Subtitle>
      </Fieldset>,
    )
    const content = mount(
      <Fieldset>
        <Fieldset.Content>
          <Fieldset.Title>test-title</Fieldset.Title>
          <Fieldset.Subtitle>test-subtitle</Fieldset.Subtitle>
        </Fieldset.Content>
      </Fieldset>,
    )

    expect(fieldset.html()).toEqual(content.html())
    expect(() => content.unmount()).not.toThrow()
  })

  it('render children through props', () => {
    const fieldset = mount(
      <Fieldset>
        <Fieldset.Title>test-title</Fieldset.Title>
        <Fieldset.Subtitle>test-subtitle</Fieldset.Subtitle>
      </Fieldset>,
    )
    const props = mount(<Fieldset title="test-title" subtitle="test-subtitle" />)
    expect(fieldset.html()).toEqual(props.html())
    expect(() => props.unmount()).not.toThrow()
  })
})
