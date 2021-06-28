import React from 'react'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useTheme, Button, Card, Grid } from 'components'
import PackageIcon from '@geist-ui/react-icons/package'
import FeatherIcon from '@geist-ui/react-icons/feather'
import GitHubIcon from '@geist-ui/react-icons/github'

const Application: NextPage<{}> = () => {
  const theme = useTheme()

  return (
    <>
      <div className="layout">
        <div className="hero">
          <h1 className="hero__title">Geist</h1>
          <h3 className="hero__description">
            An open source design system for building modern websites and applications.
          </h3>
          <div className="hero__actions">
            <NextLink href="/zh-cn/guide/installation" passHref>
              <Button auto type="success" shadow scale={1.25} margin={0.25}>
                Documentation
              </Button>
            </NextLink>
            <NextLink href="https://github.com/geist-org/react" passHref>
              <Button auto type="abort" scale={1.25} margin={0.25}>
                GitHub
              </Button>
            </NextLink>
          </div>
        </div>

        <Grid.Container gap={2} justify="center">
          <Grid xs={24} md={8}>
            <NextLink href="/zh-cn/components">
              <a>
                <Card shadow className="feature__card" width="100%">
                  <h4 className="feature__title">
                    <div className="feature__icon">
                      <PackageIcon />
                    </div>
                    Components
                  </h4>
                  <p className="feature__description">
                    Ever-increasing list of concise and aesthetic components.
                  </p>
                </Card>
              </a>
            </NextLink>
          </Grid>
          <Grid xs={24} md={8}>
            <NextLink href="/zh-cn/customization">
              <a>
                <Card shadow className="feature__card" width="100%">
                  <h4 className="feature__title">
                    <div className="feature__icon">
                      <FeatherIcon />
                    </div>
                    Customizable
                  </h4>
                  <p className="feature__description">
                    Configure sizes, colors, appearances, shapes, and more.
                  </p>
                </Card>
              </a>
            </NextLink>
          </Grid>
          <Grid xs={24} md={8}>
            <a href="https://github.com/geist-org/react" target="_blank">
              <Card shadow className="feature__card" width="100%">
                <h4 className="feature__title">
                  <div className="feature__icon">
                    <GitHubIcon />
                  </div>
                  Open Sourced
                </h4>
                <p className="feature__description">
                  Geist is open sourced and available free under MIT licence.
                </p>
              </Card>
            </a>
          </Grid>
        </Grid.Container>
      </div>
      <style jsx>{`
        .layout {
          min-height: calc(
            100vh - var(--geist-page-nav-height) - var(--geist-page-tab-height)
          );
          max-width: ${theme.layout.pageWidthWithMargin};
          margin: 0 auto;
          padding: 0 ${theme.layout.gap} calc(${theme.layout.gap} * 2);
          box-sizing: border-box;
        }
        .hero {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          padding: calc(${theme.layout.gap} * 5) 0;
        }
        .hero__title {
          font-size: 3.75rem;
          font-weight: 700;
          margin: 0;
        }
        .hero__description {
          color: ${theme.palette.accents_5};
          font-size: 1.5rem;
          font-weight: 500;
          margin: 0 0 ${theme.layout.gap};
        }
        .hero__actions :global(.btn) {
          font-weight: 500;
        }
        :global(.feature__card) :global(.content) {
          padding: ${theme.layout.gap};
        }
        .feature__title {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .feature__icon {
          height: 2.5rem;
          width: 2.5rem;
          padding: 0.625rem;
          margin-right: ${theme.layout.gapHalf};
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(#3291ff, #0761d1);
          color: #fff;
          border-radius: 2rem;
        }
        .feature__icon :global(svg) {
          width: 100%;
          height: 100%;
        }
        .feature__description {
          color: ${theme.palette.accents_6};
        }
      `}</style>
    </>
  )
}

export default Application
