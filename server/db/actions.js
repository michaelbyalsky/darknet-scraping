const client = require("./index")
const elastic = require("./elastic");
const quotes  = require("./db/quotes.json");

const esAction = {
  index: {
    _index: elastic.index,
    _type: elastic.type
  }
};

async function populateDatabase() {
  const docs = [];
  for (const quote of quotes) {
    docs.push(esAction);
    docs.push(quote);
  }
  return elastic.esclient.bulk({ body: docs });
}

