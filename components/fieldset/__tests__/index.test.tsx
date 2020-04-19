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
          <Fieldset.Footer.Status>status</Fieldset.Footer.Status>
          <Fieldset.Footer.Actions><button>Actions</button></Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })
  
  it('should render correctly', () => {
    const wrapper = render(
      <Fieldset>
        <Fieldset.Title>title</Fieldset.Title>
        <Fieldset.Subtitle>subtitle</Fieldset.Subtitle>
        <Fieldset.Footer>
          <Fieldset.Footer.Status>status</Fieldset.Footer.Status>
          <Fieldset.Footer.Actions><button>Actions</button></Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
