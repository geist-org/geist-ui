import React, { useState } from 'react'
import FullScreenIcon from 'lib/components/icons/full-screen'
import FullScreenCloseIcon from 'lib/components/icons/full-screen-close'
import Colors from './colors'
import { useTheme, Button, Text, Code, Spacer, Link, Select, Checkbox } from 'components'

const Demo: React.FC<React.PropsWithChildren<{}>> = () => {
  const theme = useTheme()
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  
  const showMoreOrLess = () => {
    setFullScreen(last => !last)
  }
  
  return (
    <div className="demo">
      <div className="action" onClick={showMoreOrLess}>
        <Button type="abort" auto>
          {fullScreen ? <FullScreenIcon /> : <FullScreenCloseIcon />}
        </Button>
      </div>
      <div className="content">
        <Text h3>Preview</Text>
        <Text>Here&#39;s a preview of your changes to the Theme. When you save the changes,
          the entire document site will change with the theme.</Text>
        
        <Text>You can download automatically generated code or share your custom theme with anyone.</Text>
  
        <Spacer y={1.7} />
        <Text h4>Colors</Text>
        <Colors />
        
        <Spacer y={1.7} />
        <Text h4>Typography</Text>
        <Text><Code>inline codes</Code>, <Link href="#" color>Hyperlink</Link></Text>
        <Text>Our mission is to make cloud computing accessible to everyone. We build products for developers and designers. And those who aspire to become one.</Text>
        <Text h6>Heading</Text>
        <Text h5>Heading</Text>
        <Text h4>Heading</Text>
        <Text h3>Heading</Text>
        <Text h2>Heading</Text>
        <Text h1>Heading</Text>
  
        <Spacer y={1.7} />
        <Text h4>Basic Components</Text>
        <Select placeholder="Choose one" initialValue="1">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
        <Spacer y={1} />
        <Button disabled auto size="small">Action</Button>
        <Spacer inline x={.5} />
        <Button auto size="small">Action</Button>
        <Spacer inline x={.5} />
        <Button auto type="secondary" size="small">Action</Button>
        <Spacer y={.5} />
        <Button>Action</Button>
        <Spacer y={1} />
        <Checkbox.Group value={['sydney']}>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="beijing">Bei Jing</Checkbox>
        </Checkbox.Group>
        <Spacer y={4} />
      </div>
      <style jsx>{`
        .demo {
          width: ${fullScreen ? '100%' : '35%'};
          margin-top: calc(${theme.layout.gap} * 2);
          margin-right: 20px;
          position: relative;
          border-right: 1px solid ${theme.palette.border};
          height: 100%;
          transition: width 200ms ease;
        }
        
        .action {
          position: absolute;
          right: .5rem;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: color 200ms ease-out;
          color: ${theme.palette.accents_3};
        }
        
        .action:hover {
          color: ${theme.palette.accents_6};
        }
        
        .action :global(button) {
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          color: inherit;
        }
        
        .content {
          width: 100%;
        }
      `}</style>
    </div>
  )
}

export default Demo
