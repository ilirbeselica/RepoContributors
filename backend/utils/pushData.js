const getUserStats = require("./getUserStats");
const getContributors = require("./getContributors");
const mongoose = require("mongoose");
const Contributor = require("../models/Contributor");

mongoose.connect(`${mongoDB_URI}`, () => {
  console.log("connected");
});

const pushtoDb = async () => {
  let dbRes;
  const contributors = await getContributors();
  let inc = 0;

  for (item of contributors) {
    const personData = await getUserStats(item);
    const Person = new Contributor(personData);
    try {
      dbRes = await Person.save();
    } catch (error) {
      console.log(error);
    }
    inc++;
    console.log(dbRes);
    console.log(`${inc} / ${contributors.length}`);
  }
};

pushtoDb();
