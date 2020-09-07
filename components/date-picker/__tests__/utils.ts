import { ReactWrapper } from 'enzyme'

export function clearInput(wrapper: ReactWrapper) {
  wrapper.find('.cfx-picker-clear').simulate('mousedown').simulate('mouseup')
}

export function nextYear(wrapper: ReactWrapper) {
  wrapper.find('.cfx-picker-header-super-next-btn').at(0).simulate('click')
}

export function nextMonth(wrapper: ReactWrapper) {
  wrapper.find('.cfx-picker-header-next-btn').at(0).simulate('click')
}

export function openPicker(wrapper: ReactWrapper, index = 0) {
  wrapper.find('input').at(index).simulate('mousedown').simulate('focus')
}

export function selectCell(wrapper: ReactWrapper, text: number | string, index = 0) {
  let matchCell = null

  wrapper
    .find('table')
    .at(index)
    .find('td')
    .forEach((td: any) => {
      if (td.text() === String(text) && td.props().className.includes('-in-view')) {
        matchCell = td
        td.simulate('click')
      }
    })

  if (!matchCell) {
    throw new Error('Cell not match in picker panel.')
  }

  return matchCell
}

export function range(start: number, end: number) {
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
