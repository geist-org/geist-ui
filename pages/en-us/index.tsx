import React from 'react'
import { NextPage } from 'next'
import { useTheme, Grid } from 'components'
import PackageIcon from '@geist-ui/icons/package'
import FeatherIcon from '@geist-ui/icons/feather'
import GitHubIcon from '@geist-ui/icons/github'
import { HomeCell } from 'lib/components'

const Application: NextPage<{}> = () => {
  const theme = useTheme()

  return (
    <>
      <div className="layout">
        <div className="hero">
          <h1 className="title">Geist</h1>
          <h3 className="desc">
            An open source design system for building modern websites and applications.
          </h3>
        </div>

        <Grid.Container gap={2} justify="center">
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<PackageIcon />}
              url="/en-us/components"
              title="Components"
              desc="Ever-increasing list of concise and aesthetic components."
            />
          </Grid>
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<FeatherIcon />}
              url="/en-us/guide/themes"
              title="Customizable"
              desc="Configure sizes, colors, appearances, shapes, and more."
            />
          </Grid>
          <Grid xs={24} md={8}>
            <HomeCell
              icon={<GitHubIcon />}
              url="https://github.com/geist-org/geist-ui"
              title="Open Sourced"
              desc="Geist is open sourced and available free under MIT licence."
            />
          </Grid>
        </Grid.Container>
      </div>
      <style jsx>{`
        .layout {
          min-height: calc(100vh - var(--geist-page-nav-height));
          max-width: ${theme.layout.pageWidthWithMargin};
          margin: 0 auto;
          padding: 0 ${theme.layout.gap} calc(${theme.layout.gap} * 2);
          box-sizing: border-box;
        }
        .hero {
          height: calc(100vh - var(--geist-page-nav-height) - 300px);
          min-height: 30vh;
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
          align-items: center;
          justify-content: center;
          display: flex;
          flex-direction: column;
        }
        .title {
          font-size: 3.75rem;
          font-weight: 700;
          margin: 0;
        }
        .desc {
          color: ${theme.palette.accents_5};
          font-size: 1.5rem;
          font-weight: 500;
          margin: 0 0 ${theme.layout.gap};
        }
      `}</style>
    </>
  )
}

export default Application
