import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Link, Tooltip } from 'components'
import { useConfigs } from 'lib/config-context'
import { CONTRIBUTORS_URL, GITHUB_URL } from 'lib/constants'
const RepoMasterURL = `${GITHUB_URL}/blob/master`

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
    const response = await fetch(`${CONTRIBUTORS_URL}?path=${path}`)
    if (!response.ok || response.status === 204) return []
    return response.json()
  } catch (e) {
    return []
  }
}

const Contributors: React.FC<Props> = ({ path }) => {
  const { isChinese } = useConfigs()
  const [users, setUsers] = useState<Array<Contributor>>([])
  const link = useMemo(() => `${RepoMasterURL}/${path || '/pages'}`, [])

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
        <Tooltip leaveDelay={0} text={<b>{user.name}</b>} key={`${user.url}-${index}`}>
          <Link color target="_blank" rel="nofollow" href={user.url}>
            <Avatar src={user.avatar} />
          </Link>
        </Tooltip>
      ))}
      <Tooltip
        leaveDelay={0}
        text={isChinese ? '在 GitHub 上编辑此页面' : 'Edit this page on GitHub'}
        type="dark">
        <Link color target="_blank" rel="nofollow" href={link}>
          <Avatar text="Add" />
        </Link>
      </Tooltip>
      <style jsx>{`
        .contributors {
          padding-left: 5px;
          padding-top: 5px;
          max-width: 100%;
          height: auto;
          display: flex;
          flex-wrap: wrap;
        }

        .contributors :global(.tooltip) {
          margin-right: 5px;
        }
      `}</style>
    </div>
  )
}

export default Contributors
