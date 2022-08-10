const fetch = require("node-fetch");

// if error, need to install dotenv node package?
// OR, is netlify not injecting the .env secrets?
// ( use the command netlify dev to start the server instead of default run command)

exports.handler = async (event) => {
  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

  const body = JSON.parse(event.body);
  const limit = body.limit;
  console.log("limit", limit);

  // take in an event
  // parse the event body, and extract from that the 'limit'
  // use the limit below in the query to make limit dynamic
  // dont forget to JSON.stringify it when putting it into this query string

  const query = `
    query getAllGenres {
      reference_list2 (
        value: { label: "genre" },
        options: { limit: ${JSON.stringify(limit)} }
      ) {
        values { value}
      }
    }
  `;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-cassandra-token": process.env.ASTRA_DB_TOKEN,
    },
    body: JSON.stringify({ query }),
  });

  try {
    const responseBody = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
