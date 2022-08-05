const fs = require('fs')

const root = {
  createRepo: async (database, prDB, args) => {
      const pullRequestsDB = prDB

      database[args.owner + "/" + args.repo] = {
        //'head': head,//'c20e46a4e3efcd408ef132872238144ea34f7ae5',
        'tokenSupply': 1_000_000,
        'openPullRequest': '',
        'contributors': {
          //'mary': 500_001,
          //'am': 15_000,
          //'jc': 10_000,
          //'pc': 75_000,
          //'mb': 75_000,
          //'np': 5_000,
          //'nn': 100_000,
          //'jp': 50_000,
          //'ts': 50_000,
          //'af': 10_000,
          //'ds': 75_000,
          //'ri': 1_000
        },
        'pullRequests': {
        }
      }

    database[args.owner + "/" + args.repo].contributors[args.contributor_id] = 1_000_000
    //database[args.owner + "/" + args.repo].contributors[args.contributor_id] = 33_999

    database[args.owner + "/" + args.repo].quorum = 0.50

    //For testing.
    //fs.writeFileSync('testing/special/turbo-src-database-create-repo.json', JSON.stringify(database, null, 2) , 'utf-8');

    return {
             pullRequestsDB: pullRequestsDB,
             db: database,
    }
  },
  createTokenSupply: function (database, tokens, args) {
    const prID = args.pr_id.split('_')[1]

    database[args.owner + "/" + args.repo].tokenSupply = tokens

    // For testing.
    //fs.writeFileSync('testing/special/turbo-src-database-create-token-supply.json', JSON.stringify(database, null, 2) , 'utf-8');

    return  database
  },
  transferTokens: async (database, prDB, args) => {
    const pullRequestsDB = prDB

    const fromAmount = database[args.owner + "/" + args.repo].contributors[args.from]
    var toAmount = database[args.owner + "/" + args.repo].contributors[args.to]

    if (fromAmount < 0) {
      throw new Error("Transfered more tokens then you own.");
    }

    if (toAmount === undefined) {
      toAmount = 0
    }

    database[args.owner + "/" + args.repo].contributors[args.from] = (fromAmount - args.amount)
    database[args.owner + "/" + args.repo].contributors[args.to] = (Number(toAmount) + Number(args.amount))

    //For testing.
    //fs.writeFileSync('testing/special/turbo-src-database-transfer-tokens.json', JSON.stringify(database, null, 2) , 'utf-8');

    return {
             pullRequestsDB: pullRequestsDB,
             db: database,
    }
  },
  setQuorum: function (database, quorum, args) {
    database[args.owner + "/" + args.repo].quorum = quorum

    //fs.writeFileSync('testing/special/turbo-src-database-set-quorum.json', JSON.stringify(database, null, 2) , 'utf-8');

    return  database
  },
  newPullRequest: function (database, pullRequestsDB, args, prVoteStatus) {
    const prID = args.pr_id.split('_')[1]

    const tokens = database[args.owner + "/" + args.repo].contributors[args.contributor_id]
    const vote_code = prVoteStatus + "%" + args.repo + "%" + args.contributor_id + "%" + tokens + "%" + args.side

    pullRequestsDB[args.pr_id] = [vote_code]

    database[args.owner + "/" + args.repo].pullRequests[prID] = {}

    database[args.owner + "/" + args.repo].pullRequests[prID].pullRequestStatus = 'open'

    database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedTokens = 0
    database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedYesTokens = 0
    database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedNoTokens = 0
    database[args.owner + "/" + args.repo].pullRequests[prID].votedTokens = {}

    //fs.writeFileSync('testing/special/turbo-src-database-new-pull-request.json', JSON.stringify(database, null, 2) , 'utf-8');

    return {
             pullRequestsDB: pullRequestsDB,
             db: database,
    }
  },
  getContributorTokens: function(database, args) {
    tokens = database[args.owner + "/" + args.repo].contributors[args.contributor_id]

    return tokens
  },
  setContributorVotedTokens: function (database, args, tokens, side) {
   const prID = (args.pr_id).split('_')[1]

   database[args.owner + "/" + args.repo].pullRequests[prID].votedTokens[args.contributor_id] = {
     tokens: tokens,
     side: side
   }

   //fs.writeFileSync('testing/special/turbo-src-database-set-contributor-voted-tokens.json', JSON.stringify(database, null, 2) , 'utf-8');

   return database
  },
  setVoteSide: function (database, args) {
   const prID = (args.pr_id).split('_')[1]

   database[args.owner + "/" + args.repo].pullRequests[prID].votedTokens[args.contributor_id].side = args.side

   return database
  },
  // Soon to be tprID. Right now it's the HEAD of the
  // pull request fork on Github.
  setTSrepoHead: function (database, args, tprID) {
   database[args.owner + "/" + args.repo].head = tprID

    // For testing.
    //fs.writeFileSync('testing/special/turbo-src-database-set-ts-repo-head.json', JSON.stringify(database, null, 2) , 'utf-8');

   return database
  },
  setPullRequestStatus: function(database, args, status) {
    const prID = (args.pr_id).split('_')[1]

    database[args.owner + "/" + args.repo].pullRequests[prID]['pullRequestStatus'] = status

    return database
  },
  getTSrepoHead: function (database, args) {
   const head = database[args.owner + "/" + args.repo].head

   return head
  },
  getOpenPullRequest: function (database, args) {
    const openPullRequest = database[args.owner + "/" + args.repo].openPullRequest

    return openPullRequest
  },
  setOpenPullRequest: function (database, args, openPullRequest) {
    database[args.owner + "/" + args.repo].openPullRequest = openPullRequest

    return database
  },
  getTSpullRequest: function(database, args) {
    const prID = (args.pr_id).split('_')[1]
    const pullRequest = database[args.owner + "/" + args.repo].pullRequests[prID]

    return pullRequest
  },
  getAllTSpullRequests: function(database, args) {
    const allTSpullRequests = database[args.owner + "/" + args.repo].pullRequests

    return allTSpullRequests
  },
  deleteTSpullRequest: function(database, args) {
    const prID = (args.pr_id).split('_')[1]

    delete database[args.owner + "/" + args.repo].pullRequests[prID]

    return database
  },
  getContributorVotedTokens: function(database, args) {
    const prID = (args.pr_id).split('_')[1]

    const votedTokens = database[args.owner + "/" + args.repo].pullRequests[prID].votedTokens[args.contributor_id]

    return votedTokens
  },
  getAllVotedTokens: function(database, args) {
    const prID = (args.pr_id).split('_')[1]

    const allVotedTokens = database[args.owner + "/" + args.repo].pullRequests[prID].votedTokens

    return allVotedTokens
  },
  getContributorTokenAmount: function(database, args) {
    const contributorTokenAmount = database[args.owner + "/" + args.repo].contributors[args.contributor_id]

    return contributorTokenAmount
  },
  getTokenSupply: function(database, args) {
    const supply = database[args.owner + "/" + args.repo].tokenSupply

    return supply
  },
  getQuorum: function(database, args) {
    const quorum = database[args.owner + "/" + args.repo].quorum

    return quorum
  },
  getTotalVotedTokens: function(database, args) {
    const prID = (args.pr_id).split('_')[1]

    const totalVotedTokens = database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedTokens

    return totalVotedTokens
  },
  getTotalVotedYesTokens: function(database, args) {
    const prID = (args.pr_id).split('_')[1]

    const totalVotedYesTokens = database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedYesTokens

    return totalVotedYesTokens
  },
  getPullRequestFromHistory: function(pullRequestsDB, args) {
    var pullRequest = pullRequestsDB[args.pr_id]

    return pullRequest
  },
  getTotalVotedNoTokens: function(database, args) {
    const prID = (args.pr_id).split('_')[1]

    const totalVotedNoTokens = database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedNoTokens

    return totalVotedNoTokens
  },
  getRepoStatus: function(database, args) {
    return Object.keys(database).includes(args.repo_id)
  },
  checkContributor: function(database, args) {
    const contributors = database[args.repo_id].contributors;
    const contributor_exists = Object.keys(contributors).includes(args.contributor_id)

    return contributor_exists
  },
  addToTotalVotedTokens: function(database, args, tokens) {
    const prID = (args.pr_id).split('_')[1]

    const totalVotedTokens = database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedTokens

    database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedTokens = totalVotedTokens + tokens

    return database
  },
  addToTotalVotedYesTokens: function(database, args, tokens) {
    const prID = (args.pr_id).split('_')[1]

    const totalVotedYesTokens = database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedYesTokens

    database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedYesTokens = totalVotedYesTokens + tokens

    //fs.writeFileSync('testing/special/turbo-src-database-add-voted-yes.json', JSON.stringify(database, null, 2) , 'utf-8');

    return database
  },
  addToTotalVotedNoTokens: function(database, args, tokens) {
    const prID = (args.pr_id).split('_')[1]

    const totalVotedNoTokens = database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedNoTokens

    database[args.owner + "/" + args.repo].pullRequests[prID].totalVotedNoTokens = totalVotedNoTokens + tokens

    return database
  },
  addToMergePullRequestHistory: function(pullRequestVoteMergeHistory, args) {
    const prID = (args.pr_id).split('_')[1]

    pullRequestVoteMergeHistory.push(prID)

    return pullRequestVoteMergeHistory
  },
  addToRejectPullRequestHistory: function(pullRequestVoteCloseHistory, args) {
    const prID = (args.pr_id).split('_')[1]

    pullRequestVoteCloseHistory.push(prID)

    return pullRequestVoteCloseHistory
  },
  checkMergePullRequestHistory: function(pullRequestVoteMergeHistory, args) {
    const prID = (args.pr_id).split('_')[1]

    return pullRequestVoteMergeHistory.includes(prID)
  },
  checkRejectPullRequestHistory: function(pullRequestVoteCloseHistory, args) {
    const prID = (args.pr_id).split('_')[1]

    return pullRequestVoteCloseHistory.includes(prID)
  },
}

module.exports = root
