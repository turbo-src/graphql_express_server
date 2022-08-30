const superagent = require("superagent");

const namespaceUrl = "https://namespace-db.fly.dev/graphql";

var root = {
  postCreateUser: async (
    owner,
    repo,
    contributor_id,
    contributor_name,
    contributor_signature
  ) => {
    superagent
      .post(namespaceUrl)
      .send({
        query: `{ createUser(owner: "${owner}", repo: "${repo}", contributor_id: "${contributor_id}", contributor_name: "${contributor_name}", contributor_signature: "${contributor_signature}") }`,
      })
      .set("accept", "json")
      .end((err, res) => {
        //Calling the end function will send the request
        const json = JSON.parse(res.text);
        return json.data.createUser;
      });
  },
  postGetContributorName: async (owner, repo, pr_id, contributor_id) => {
    const res = await superagent
      .post(namespaceUrl)
      .send({
        query: `{ getContributorName(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_id: "${contributor_id}") }`,
      })
      .set("accept", "json");
    // .end((err, res) => {
    //   const json = JSON.parse(res.text);
    //   return json.data.getContributorName;
    // });
    const json = JSON.parse(res.text);
    return json.data.getContributorName;
  },
  postGetContributorID: async (owner, repo_id, pr_id, contributor_name) => {
    const res = await superagent
      .post(namespaceUrl)
      .send({
        query: `{ getContributorID(owner: "${owner}", repo_id: "${repo_id}", pr_id: "${pr_id}", contributor_name: "${contributor_name}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorID;
  },
  postGetContributorSignature: async (owner, repo, pr_id, contributor_name) => {
    const res = await superagent
      .post(namespaceUrl)
      .send({
        query: `{ getContributorSignature(owner: "${owner}", repo: "${repo}", pr_id: "${pr_id}", contributor_name: "${contributor_name}") }`,
      })
      .set("accept", "json");
    //.end((err, res) => {
    // Calling the end function will send the request
    //});
    const json = JSON.parse(res.text);
    return json.data.getContributorSignature;
  },
};

module.exports = root;
