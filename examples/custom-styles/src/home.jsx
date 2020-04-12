import React from 'react'
import { Card, Text } from '@zeit-ui/react'
import './style.css'

const Home = () => (
  <div className="my-app">
    <Card shadow style={{ width: '500px', margin: '100px auto' }}>
      <Text className="my-text">Modern and minimalist React UI library.</Text>
      <Text type={'success'} style={{ color: '#000' }}>Modern and minimalist React UI library.</Text>
      <Text type={'warning'} style={{ color: '#000' }}>Modern and minimalist React UI library. </Text>
      <Text type={'error'} style={{ color: '#000' }}>Modern and minimalist React UI library. </Text>
      <Text type={'secondary'} style={{ color: '#000' }}>Modern and minimalist React UI library.</Text>
    </Card>
  </div>
)

export default Home
