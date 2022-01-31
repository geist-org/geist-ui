import React from 'react'
import { Card, Link, useTheme } from 'components'
import NextLink from 'next/link'

export type HomeCellProps = {
  url: string
  title: string
  desc: string
  icon: React.ReactNode
}

const HomeCell: React.FC<HomeCellProps> = ({ url, title, desc, icon }) => {
  const theme = useTheme()
  return (
    <NextLink href={url} passHref>
      <Link>
        <Card padding="5px" shadow width="100%">
          <h4 className="feature__title">
            <div className="feature__icon">{icon}</div>
            {title}
          </h4>
          <p className="feature__description">{desc}</p>
        </Card>
        <style jsx>{`
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
      </Link>
    </NextLink>
  )
}

export default HomeCell
