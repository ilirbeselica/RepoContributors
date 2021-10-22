const axios = require("axios");

const getUserStats = async (user) => {
  let res;
  try {
    res = await axios.get(user.url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
  try {
    const {
      name,
      followers,
      public_repos,
      public_gists,
      avatar_url,
      repos_url,
    } = res.data;
    return {
      name,
      followers,
      public_repos,
      public_gists,
      avatar_url,
      repos_url,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUserStats;
