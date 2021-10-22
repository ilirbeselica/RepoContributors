const mongoose = require("mongoose");
const { Schema } = mongoose;

const contributorSchema = new Schema({
  name: String,
  followers: Number,
  public_repos: Number,
  public_gists: Number,
  avatar_url: String,
  repos_url: String,
});

const Contributor = mongoose.model("Contributor", contributorSchema);
module.exports = Contributor;
