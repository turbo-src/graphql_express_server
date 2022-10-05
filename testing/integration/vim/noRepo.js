const assert = require('assert');
const {
        postCreateRepo,
        postSetVote,
        postGetPullRequest,
        postNewPullRequest
      } = require('../../../src/utils/requests')
const { Parser } = require('graphql/language/parser');

var snooze_ms = 1000;

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Create repo', function () {
    this.timeout(15000);
    // Increase mocha(testing framework) time, otherwise tests fails
    before(async () => {
        //await postNewPullRequest(
        //    /*owner:*/ "vim",
        //    /*repo:*/ "vim",
        //    /*defaultHash:*/ "defaultHash8457",
        //    /*contributor_id:*/ "7db9a",
        //    /*side:*/ "yes",
        //);
        //await snooze(1500);
    });
    describe.only('Check status after creating a repo.', function () {
      it("Should do something", async () => {
        await snooze(1500);
        const status = await postGetPullRequest(
            /*owner:*/ "vim",
            /*repo:*/ "vim",
            /*defaultHash:*/ "defaultHash8457",
            /*contributor_id:*/ "7db9a",
            /*side:*/ "yes",
        );

        //console.log(status)

        assert.equal(
            status,
            "none",
            "Has a closed or open status even though repo wasn't created."
        );
      });
    });
});