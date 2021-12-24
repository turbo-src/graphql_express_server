const { Octokit, App } = require("octokit");
const fsPromises = require('fs').promises;
const fs = require('fs').promises;


const gitHeadUtil = {
  gitHeadUtil: async function(owner, repo, headMinusNum) {
     const data = await fsPromises.readFile('.github-token')
                        .catch((err) => console.error('Failed to read file', err));
     const token = data.toString();
     const octokit = new Octokit({ auth: token });
     const resCommits = await octokit.request(`GET /repos/${owner}/${repo}/commits`)
     const dataCommits = resCommits.data
     const head = Object.entries(dataCommits)[headMinusNum][1].sha

     return head
  }
}


module.exports = gitHeadUtil