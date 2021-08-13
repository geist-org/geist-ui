import { Card, useTheme } from 'components'
import React from 'react'

const AttributesTable: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const theme = useTheme()

  return (
    <Card className="attr">
      {children}
      <style jsx global>{`
        .attr pre {
          padding: 14px 15px;
          margin: 0;
        }
        .attr table {
          margin-right: ${theme.layout.gap};
        }
        .attr h4.title {
          margin-top: calc(${theme.layout.gap} * 2.2);
        }
        .attr h4.title:first-of-type {
          margin-top: 0;
        }
        .attr table {
          border-collapse: separate;
          border-spacing: 0;
          width: 100%;
        }
        .attr thead th td {
          height: 2.5rem;
        }
        .attr tbody tr td {
          height: 3.333rem;
        }
        .attr th,
        .attr td {
          padding: 0 0.625rem;
          text-align: left;
        }
        .attr th {
          height: 2.5rem;
          color: ${theme.palette.accents_5};
          font-size: 0.75rem;
          font-weight: 400;
          letter-spacing: 0;
          background: ${theme.palette.accents_1};
          border-bottom: 1px solid ${theme.palette.border};
          border-top: 1px solid ${theme.palette.border};
        }
        .attr th:nth-child(1) {
          border-bottom: 1px solid ${theme.palette.border};
          border-left: 1px solid ${theme.palette.border};
          border-radius: 4px 0 0 4px;
          border-top: 1px solid ${theme.palette.border};
        }
        .attr th:last-child {
          border-bottom: 1px solid ${theme.palette.border};
          border-radius: 0 4px 4px 0;
          border-right: 1px solid ${theme.palette.border};
          border-top: 1px solid ${theme.palette.border};
        }
        .attr tr td {
          border-bottom: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_6};
          font-size: 0.875rem;
          height: 2.5rem;
        }
        .attr td:nth-child(1) {
          border-left: 1px solid transparent;
        }
        .contributor-title {
          text-transform: uppercase;
          font-size: 1rem;
          letter-spacing: 1.5px;
        }
        @media only screen and (max-width: ${theme.layout.breakpointMobile}) {
          .attr {
            overflow-x: scroll;
          }
          .attr::-webkit-scrollbar {
            width: 0;
            height: 0;
            background-color: transparent;
          }
        }
      `}</style>
    </Card>
  )
}

export default AttributesTable
