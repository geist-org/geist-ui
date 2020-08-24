import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Link, Tooltip, useTheme } from 'components'
import { useConfigs } from 'lib/config-context'
const GithubURL = 'https://github.com/geist-org/react/blob/master'
const host = 'https://contributors.geist-ui.dev/api/users'

export interface Contributor {
  name: string
  avatar: string
  url: string
}

interface Props {
  path: string
}

const getContributors = async (path: string): Promise<Array<Contributor>> => {
  try {
    const response = await fetch(`${host}?path=${path}`)
    if (!response.ok || response.status === 204) return []
    return response.json()
  } catch (e) {
    return []
  }
}

const Contributors: React.FC<Props> = ({ path }) => {
  const theme = useTheme()
  const { isChinese } = useConfigs()
  const [users, setUsers] = useState<Array<Contributor>>([])
  const link = useMemo(() => `${GithubURL}/${path || '/pages'}`, [])

  useEffect(() => {
    let unmount = false
    ;(async () => {
      const contributors = await getContributors(path)
      if (unmount) return
      setUsers(contributors)
    })()
    return () => {
      unmount = true
    }
  }, [])

  return (
    <div className="contributors">
      {users.map((user, index) => (
        <Tooltip text={<b>{user.name}</b>} key={`${user.url}-${index}`}>
          <Link color target="_blank" rel="nofollow" href={user.url}>
            <Avatar src={user.avatar} />
          </Link>
        </Tooltip>
      ))}
      <Tooltip text={isChinese ? '在 GitHub 上编辑此页面' : 'Edit this page on GitHub'} type="dark">
        <Link color target="_blank" rel="nofollow" href={link}>
          <Avatar text="Add" />
        </Link>
      </Tooltip>
      <style jsx>{`
        .contributors {
          padding-left: ${theme.layout.gap};
          padding-top: ${theme.layout.gap};
          max-width: 100%;
          height: auto;
          display: flex;
          flex-wrap: wrap;
        }

        .contributors :global(.tooltip) {
          margin-right: 3px;
        }
      `}</style>
    </div>
  )
}

export default Contributors
