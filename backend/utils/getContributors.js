const { Octokit } = require("@octokit/core");
const { paginateRest } = require("@octokit/plugin-paginate-rest");
const Myoc = Octokit.plugin(paginateRest);
const octokit = new Myoc({
  auth: `${githubToken}`,
});

const getContributors = async () => {
  const contributors = [];
  let people;
  const repos = await octokit.paginate("GET /orgs/{org}/repos", {
    org: "angular",
    type: "public",
    per_page: 100,
  });

  let inc = 0;
  for (item of repos) {
    inc++;
    try {
      people = await octokit.paginate(
        "GET /repos/{owner}/{repo}/contributors",
        {
          owner: "angular",
          repo: item.name,
          per_page: 100,
        }
      );
    } catch (error) {
      console.log(error);
    }

    people.forEach((item) => contributors.push(item));
    console.log(inc);
  }
  const filtered = Array.from(
    new Set(contributors.map((person) => person.id))
  ).map((id) => {
    return contributors.find((el) => el.id === id);
  });

  return filtered;
};

module.exports = getContributors;
