const assert = require('assert');
const fsPromises = require('fs').promises;
const { postSetVote,
        postGetPullRequest,
        postGetPRvoteTotals,
        postGetPRvoteYesTotals,
        postCreateRepo,
        postNewPullRequest,
        postGetContributorID,
        postGetContributorName,
      } = require('../../../src/utils/requests')
const { Parser } = require('graphql/language/parser');
const {
        getContributorAddress,
        getGithubContributor,
      } = require('../../../src/utils/config')


var snooze_ms = 1500;;

// We call this at the top of each test case, otherwise nodeosd could
// throw duplication errors (ie, data races).
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Vote.', function () {
    this.timeout(snooze_ms*50);
    // Increase mocha(testing framework) time, otherwise tests fails
    describe('Many voters vote.', function () {
      it("Should increment vote and then close and merge on quorum.", async () => {
        const contributor_name = await getGithubContributor()
        await snooze(snooze_ms);
        const contributor_id = await postGetContributorID(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_name:*/ contributor_name,
        );

        //user
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor:*/ contributor_id,
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const sevenDbVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor:*/ contributor_name,
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        //am
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x571BD871120767344b4EE3Ec309c74a3D98aAf0B",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const amDbVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "am",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        //jc
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x493D1c854301054e5D0b0bCFE3cfAe893d573dBa",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const jcVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "jc",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // pc
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x5061EF86EFcF6Ad2fdcefF8FE9E014a1Ca6801c2",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const pcVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "pc",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        //mb
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x232b9E710e897aEb18FEbe410526B987641BaE5f",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const mbVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "mb",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // np
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x55f8B1594beB8eA1fD366c0C138B26e70C03a6ec",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const npVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "np",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // nn
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x45dD192B318e2f1d242954E016492BDF9446381e",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const nnVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "nn",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // jp
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x1d344C9A2Ee5c0a24336dd1A0c5c79ccD50D06C9",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const jpVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "jp",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // ts
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x9095B61290249584d9d0447657a03Cf23BF7a325",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const tsVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "ts",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // af
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0xd30Dcb56A4d3EC2dC8591588455A5Da4C3c84eCD",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const afVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "af",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // ds
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x1d0798e209A07715765F1486CA64f3D2399aF719",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const dsVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "ds",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        // ri
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0xDB7A25D3B4C5506779bD9f9f1A5AA0DB525Fa6A8",
            /*side:*/ "no",
        );
        await snooze(snooze_ms);
        const riVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "ri",
            /*side:*/ "yes",
        );
        assert.equal(
            sevenDbVoteCumm,
            "0.034",
            "Fail to add votes."
        );
        //assert.equal(
        //    amVoteCumm =
        //    "0.snooze_ms0",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    jcVoteCumm =
        //    "0.10000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    pcVoteCumm =
        //    "0.75000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    mbVoteCumm =
        //    "0.5000",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    npVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    nnVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    jpVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    tsVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    afVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        //assert.equal(
        //    dsVoteCumm =
        //    "0.499999",
        //    "Fail to add votes."
        //);
        const openStatus = await postGetPullRequest(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "ri",
            /*side:*/ "yes",
        );

        //Now close vote.
        await snooze(snooze_ms);
        // mary
        await postSetVote(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*childDefaultHash:*/ "issue_4",
	    /*mergeable:*/ true,
            /*contributor_id:*/ "0x09EAF54C0fc9F2b077ebC96e3FeD47051f7fb626",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const mergeStatus = await postGetPullRequest(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "mary",
            /*side:*/ "yes",
        );
        await snooze(snooze_ms);
        const maryVoteCumm = await postGetPRvoteTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "mary",
            /*side:*/ "yes",
        );

        var jcVoteYesTotal = await postGetPRvoteYesTotals(
            /*owner:*/ contributor_name,
            /*repo:*/ "demo",
            /*defaultHash:*/ "issue_4",
            /*contributor_id:*/ "jc",
            /*side:*/ "yes",
        );

        jcVoteYesTotal = Number(jcVoteYesTotal);
	const quorum = 0.5 //getRepo
	const majority = 0.5 // implicit, must be greater than
	const supply = 1_000_000 //implicit
	const yesVotesMinimumToMerge = quorum*supply*majority + 1 // majority + 1 vote.

	var jcYesVotePercentToMergeInteger = 100*((jcVoteYesTotal / yesVotesMinimumToMerge))
	
	// Show 1 decimal if less than 10%. Greater, round to nearest integer.
	if (jcYesVotePercentToMergeInteger < 10) {
	  jcYesVotePercentToMergeInteger = jcYesVotePercentToMergeInteger.toFixed(1)
	} else if (jcYesVotePercentToMergeInteger > 100) {
          jcYesVotePercentToMergeInteger = 100
	} else {
	  jcYesVotePercentToMergeInteger =  Math.round(jcYesVotePercentToMergeInteger)
	}

        //assert.equal(
        //    jcVoteYesTotal,
        //    904_001,
	//    "Failed to get total yes vote percentage string."
        //);

        assert.equal(
            `${jcYesVotePercentToMergeInteger}%`,
            "100%",
	    "Failed to get percentage string."
        );

        assert.equal(
            riVoteCumm,
            "0.499999",
            "Fail to add votes."
        );
        assert.deepEqual(
          openStatus,
         { status: 200, state: "open", repo_id: `${contributor_name}/demo`,  fork_branch: "pullRequest4", "childDefaultHash": "90a37db47574c1c16e0a9865f809ca2283e6a412", "defaultHash": "90a37db47574c1c16e0a9865f809ca2283e6a412" },
          "Fail open on initial vote below quorum"
        );
        assert.deepEqual(
          mergeStatus,
         { status: 200, state: "merge", repo_id: `${contributor_name}/demo`,  fork_branch: "pullRequest4", "childDefaultHash": "90a37db47574c1c16e0a9865f809ca2283e6a412", "defaultHash": "90a37db47574c1c16e0a9865f809ca2283e6a412" },
          "Fail to merge even though it was voted in."
        );
      });
    });
});
