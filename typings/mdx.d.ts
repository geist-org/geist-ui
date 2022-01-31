declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module "@mdx-js/react" {
  import { ComponentType, StyleHTMLAttributes } from "react"
  
  type MDXProps = {
    children: React.ReactNode
    components: { [key:? string]: React.ReactNode,  }
  }
  export class MDXProvider extends React.Component<MDXProps> {}
}
