import React from 'react'
import Colors from './colors'
import { useTheme, Button, Text, Code, Spacer, Link, Select } from 'components'
import { useConfigs } from 'lib/config-context'

const Demo: React.FC<React.PropsWithChildren<{}>> = () => {
  const theme = useTheme()
  const { isChinese } = useConfigs()

  return (
    <div className="demo">
      <div className="content">
        {isChinese ? (
          <>
            <Text h3>预览</Text>
            <Text>
              这里是你变更主题后的即时预览。此外，当你每次更新主题变量时，整个文档站点也会随之变化。
            </Text>
            <Text>你可以拷贝自动生成的代码，或是与任何人分享你自定义的主题样式。</Text>
          </>
        ) : (
          <>
            <Text h3>Preview</Text>
            <Text>
              Here&#39;s a preview of your changes to the Theme. When you set the changes, the
              entire document site will change with the theme.
            </Text>
            <Text>
              You can copy automatically generated codes or share your custom theme with anyone.
            </Text>
          </>
        )}

        <Spacer y={1.7} />
        <Text h4>{isChinese ? '色彩' : 'Colors'}</Text>
        <Colors />

        <Spacer y={1.7} />
        <Text h4>{isChinese ? '排版' : 'Typography'}</Text>
        <Text>
          <Code>inline codes</Code>
        </Text>
        <Text>
          <a>Hyperlink Text</a>{' '}
        </Text>
        <Text>
          <Link href="#" color>
            Link Component
          </Link>
        </Text>
        <Text>
          Our mission is to make cloud computing accessible to everyone. We build products for
          developers and designers. And those who aspire to become one.
        </Text>
        <Text h6>Heading</Text>
        <Text h5>Heading</Text>
        <Text h4>Heading</Text>
        <Text h3>Heading</Text>
        <Text h2>Heading</Text>
        <Text h1>Heading</Text>

        <Spacer y={1.7} />
        <Text h4>{isChinese ? '基础组件' : 'Basic Components'}</Text>
        <Select placeholder="Choose one" initialValue="1">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
        <Spacer y={1} />
        <Button disabled auto size="small">
          Action
        </Button>
        <Spacer inline x={0.5} />
        <Button auto size="small">
          Action
        </Button>
        <Spacer inline x={0.5} />
        <Button auto type="secondary" size="small">
          Action
        </Button>
        <Spacer y={0.5} />
        <Button>Action</Button>
      </div>
      <style jsx>{`
        .demo {
          width: 34%;
          margin-top: calc(${theme.layout.gap} * 2);
          margin-right: ${theme.layout.gap};
          padding-right: ${theme.layout.gapQuarter};
          position: relative;
          border-right: 1px solid ${theme.palette.border};
          height: 100%;
          transition: width 200ms ease;
        }

        .content {
          width: 100%;
        }

        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .demo {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Demo
