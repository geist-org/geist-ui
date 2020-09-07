import useDOMDimension from '../use-dom-dimension'
import React from 'react'
import { mount } from 'enzyme'
describe('useFixedWidth', () => {
  it('should work on a null component', () => {
    function App() {
      //todo jest can not get width value correctly
      const ref = useDOMDimension<HTMLDivElement>('offsetWidth')[1]
      return <div>{false && <div style={{ width: 100 }} ref={ref}></div>}</div>
    }

    mount(<App />)
  })
})
