const assert = require('assert');
const fsPromises = require('fs').promises;
const {
        postGetVotePowerAmount,
        postCreateRepo,
        getRepoStatus,
        postGetContributorID,
        postGetContributorName,
      } = require('../../../src/utils/requests')
const { Parser } = require('graphql/language/parser');
const {
        getContributorAddress,
        getGithubContributor,
      } = require('../../../src/utils/config')
const {
       getGithubToken,
      } = require('../../../src/utils/gitHubUtil.js')

const { findOrCreateNameSpaceRepo } = require("../../../src/utils/requests");

var snooze_ms = 5000

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Create repo', function () {
    this.timeout(snooze_ms*12);
    // Increase mocha(testing framework) time, otherwise tests fails
    before(async () => {
    });
    describe.only('Create repo', function () {
      it("Should do create repo", async () => {
        const contributor_name = await getGithubContributor()
	const token = await getGithubToken()

  const nameSpaceRepo = await findOrCreateNameSpaceRepo(
    `${contributor_name}/demo`,
    ""
  );
  console.log('nameSpaceRepo', nameSpaceRepo)

	//name space service
        const contributor_id = await postGetContributorID(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "",
            /*contributor_name:*/ contributor_name,
        );
  console.log('nameSpaceRepo', nameSpaceRepo.repoID)

        const resCreateRepo = await postCreateRepo(
            /*owner:*/ contributor_name,
            /*repo:*/ '123',
            /*defaultHash:*/ "",
            /*contributor:*/ contributor_id,
            /*side:*/ "",
	    /*token:*/ token
        );
console.log('rescreateRepo', resCreateRepo)
        const resRepoStatus = await getRepoStatus(`${contributor_name}/demo`);

        await snooze(snooze_ms);
        const contributorTokenAmount = await postGetVotePowerAmount(
            /*owner:*/ contributor_name,
            /*repo:*/ nameSpaceRepo.repoID,
            /*defaultHash:*/ "",
            /*contributor:*/ contributor_id,
            /*side:*/ "no",
            /*token:*/ token
        );

        assert.deepEqual(
            contributorTokenAmount,
	    { status: 200, amount: 1_000_000 },
            "Fail to get amount."
        );

        assert.equal(
	    Number(resCreateRepo),
            201,
            "Fail to create repo."
        );

      
      });
    });
})
