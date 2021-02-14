import React from 'react'
import { Text, Tag, useTheme, Select } from '@geist-ui/react'

const Home = ({ onThemeChange }) => {
  const theme = useTheme()
  const changeHandler = val => {
    onThemeChange && onThemeChange(val)
  }

  return (
    <div>
      <Select size="small" value={theme.type} onChange={changeHandler}>
        <Select.Option label>System preset</Select.Option>
        <Select.Option value="light">Light</Select.Option>
        <Select.Option value="dark">Dark</Select.Option>
        <Select.Option label>My custom</Select.Option>
        <Select.Option value="green">Green</Select.Option>
        <Select.Option value="red">Red</Select.Option>
      </Select>

      <Text type={'success'}>
        Success. <Tag>{theme.palette.success}</Tag>
      </Text>
      <Text type={'warning'}>
        Warning. <Tag>{theme.palette.warning}</Tag>
      </Text>
      <Text type={'error'}>
        Error. <Tag>{theme.palette.error}</Tag>
      </Text>
      <Text type={'secondary'}>
        Secondary (Uncovered). <Tag>{theme.palette.secondary}</Tag>
      </Text>
    </div>
  )
}

export default Home
