
const markdownCommits = require('./../../src/markdown/markdownCommits')

const moment = require('moment')
const MockDate = require('mockdate')
MockDate.set(moment('2018-04-24'))

let headDate = moment().format()
let tailDate = moment().subtract(7, 'days').format()

const commits = require('./../payload/commits')
let emptyCommit = commits.emptyCommits
let nullCommit = commits.nullCommits
let uselessCommits = commits.uselessCommits
let manyCommits = commits.manyCommits
let allCommits = commits.allCommits

test('that checks return string if the commit data is empty', () => {
  expect(markdownCommits(emptyCommit, headDate, tailDate)).toContain('# COMMITS')
  expect(markdownCommits(emptyCommit, headDate, tailDate)).toContain('Last week there were no commits.')
})

test('that checks return string if the commit data is null', () => {
  expect(markdownCommits(nullCommit, headDate, tailDate)).toContain('# COMMITS')
  expect(markdownCommits(nullCommit, headDate, tailDate)).toContain('Last week there were no commits.')
})

test('that checks return string if the commit data is useless', () => {
  expect(markdownCommits(uselessCommits, headDate, tailDate)).toContain('# COMMITS')
  expect(markdownCommits(uselessCommits, headDate, tailDate)).toContain('Last week there were no commits.')
})

test('that checks return string if there are many commits', () => {
  expect(markdownCommits(manyCommits, headDate, tailDate)).toContain('# COMMITS')
  expect(markdownCommits(manyCommits, headDate, tailDate)).toContain('Last week there were 3 commits.')
  expect(markdownCommits(manyCommits, headDate, tailDate)).toContain(':hammer_and_wrench: [Weekly-Digest commit test3](https://github.com/aps120797/playground/commit/commit-sha-3) by [gr2m](https://github.com/gr2m/)')
  expect(markdownCommits(manyCommits, headDate, tailDate)).toContain(':hammer_and_wrench: [Weekly-Digest commit test3](https://github.com/aps120797/playground/commit/commit-sha-2) by [wilhelmklopp](https://github.com/wilhelmklopp/)')
  expect(markdownCommits(manyCommits, headDate, tailDate)).toContain(':hammer_and_wrench: [Weekly-Digest commit test3](https://github.com/aps120797/playground/commit/commit-sha-1) by [aps120797](https://github.com/aps120797/)')
})

test('that checks return string if there are commit', () => {
  expect(markdownCommits(allCommits, headDate, tailDate)).toContain('# COMMITS')
  expect(markdownCommits(allCommits, headDate, tailDate)).toContain('Last week there was 1 commit.')
  expect(markdownCommits(allCommits, headDate, tailDate)).toContain(':hammer_and_wrench: [Weekly-Digest commit test3](https://github.com/aps120797/playground/commit/commit-sha-3) by [aps120797](https://github.com/aps120797/)')
})
