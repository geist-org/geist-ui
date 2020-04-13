require('dotenv').config()
const fs = require('fs-extra')
const path = require('path')
const { GraphQLClient } = require('graphql-request')
const target = path.join(__dirname, '../lib/data/', 'contributors.json')
const token = process.env.GITHUB_PUBLIC_READ_ONLY
if (!token) {
  console.error('> Not found "GITHUB_PUBLIC_READ_ONLY" in "process.env".\n')
  console.log('  Env variables are automatically injected at production.')
  console.log('  If you want to test, run [echo "GITHUB_PUBLIC_READ_ONLY=your_git_token" > .env ]\n')
  process.exit(1)
}
const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
const pagePrefix = path.join(__dirname, '../pages')

const filterContributors = data => {
  if (!data || !data.repository) return []
  const nodes = data.repository.object.history.nodes
  let users = [], keys = {}
  for (const item of nodes) {
    const key = item.author.user.url
    if (!keys[key]) {
      keys[key] = 1
      users.push({
        name: item.author.name,
        avatar: item.author.user.avatarUrl,
        url: item.author.user.url,
      })
    }
  }
  return users
}

const getContributors = async repoFilePath => {
  const query = `query($path: String!) {
    repository(owner: "zeit-ui", name: "react") {
      object(expression: "master") {
        ... on Commit {
          history(first: 100, path: $path) {
            nodes {
              author {
                name
                user {
                  avatarUrl
                  url
                }
              }
            }
          }
        }
      }
    }
  }`
  const data = await client.request(query, { path: repoFilePath })
  return filterContributors(data)
}

const getFiles = async dirPath => {
  const files = await fs.readdir(dirPath)
  return files.filter(name => name.endsWith('.mdx'))
}

const getUrls = async () => {
  const en = path.join(pagePrefix, 'en-us', 'components')
  const zh = path.join(pagePrefix, 'zh-cn', 'components')
  const enFiles = await getFiles(en)
  const zhFiles = await getFiles(zh)
  
  return enFiles
    .map(name => `pages/en-us/components/${name}`)
    .concat(zhFiles.map(name => `pages/zh-cn/components/${name}`))
}

;(async () => {
  const urls = await getUrls()
  
  const users = await Promise.all(urls.map(async url => {
    try {
      return {
        name: url,
        users: await getContributors(url),
      }
    } catch (e) {
      return {}
    }
  }))
  
  const contributors = users.reduce((pre, current) => {
    if (!current.name) return pre
    return {
      ...pre,
      [current.name]: current.users,
    }
  }, {})
  
  fs.writeJSONSync(target, contributors)
})()
