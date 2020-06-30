##  ZEIT UI - React Contributing Guide

### Ready to start

We welcome everyone to join in the construction of the project.
As a pre requirement, you need to have a preliminary understanding of React,
this is a good [learning document for React](https://reactjs.org/docs/getting-started.html).
For basic operation of Git, you can refer to [GitHub's help documentation](https://help.github.com/en/github/using-git).

1. [Fork this repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) to your own account and then clone it.
2. Create a new branch for your changes: `git checkout -b {BRANCH_NAME}`.
3. Install [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) and then update project dependenices: `yarn`.
4. Run `yarn dev` and view your changes on your local document site. (If you add a new document page, you need to run `yarn dev` agian)

At any time, you think it's ok, you can start the following steps to submit your amazing works:

1. Run `yarn lint` check the code style.
2. Run `yarn test-update` to update & run your testcase.
3. Run `git commit -ma '{YOUR_MESSAGE}'` to commit changes. Commit info should be formatted by the [rules](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md).
4. Push code to your own repo and [create PullRequest](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) at GitHub.

### Common steps

#### **Create component**

1. Create a folder in `components`, and add `import` to `components/index.ts`.
2. Create a document file in `pages/en-us/components/`.
3. Restart local server view changes: `yarn dev`.

#### **About document page**

1. Document page must have `meta` field. refer to [here](https://github.com/zeit-ui/react/blame/master/pages/en-us/components/avatar.mdx#L4).
2. If you are creating a new component, please provide at least one document.
3. Dodcument using [mdx-js](https://github.com/mdx-js/mdx), here is [vs-code plug-in](https://github.com/silvenon/vscode-mdx),
[web-storm support](https://youtrack.jetbrains.com/issue/WEB-32599)

#### **Create testcase**

1. If you are creating a new component, the testcase is required.
2. If you only modify components, please note update **test snapshot**: `yarn test-update`.
3. (Optional) Modifying `testRegex` in `.jest.config.js` allows you to test only a single component.
4. Please check coverage locally before submit.

### Q & A

> How to choose the target branch of PR ?

- If this is a `feature`, set to `rc` branch. All the others are set to `master` branch.

> I added a new document page, but it was not displayed locally ?

- Run `yarn dev` agian.

> How can I update remote origin ?

- refer to [here](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes).


### Get stuck

- Create new issue to tell us: [create issue](https://github.com/zeit-ui/react/issues/new/choose).
- Ask in [chat room](https://spectrum.chat/zeit-ui/general?tab=posts).
