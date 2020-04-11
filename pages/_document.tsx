import Document, { Html, Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import { DocumentContext, DocumentInitialProps } from 'next/dist/next-server/lib/utils'

class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {flush()}
        </>
      )
    }
  }
  
  render() {
    return (
      <Html>
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{ __html: `
            (function(){
              if (!window.localStorage) return;
              if (window.localStorage.getItem('theme') === 'dark') {
                document.documentElement.style.background = '#000';
                document.body.style.background = '#000';
              };
            })()
          `}} />
          <Main />
          <NextScript />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110371817-12" />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-110371817-12');
              `
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
