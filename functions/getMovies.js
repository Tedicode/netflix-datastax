const fetch = require("node-fetch");

// if error, need to install dotenv node package?
// OR, is netlify not injecting the .env secrets?
// ( use the command netlify dev to start the server instead of default run command)

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const genre = body.genre;
  const pageState = body.pageState;

  const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

  const query = `
    query {
      movies_by_genre (value: {genre: ${JSON.stringify(genre)}},
      orderBy: [year_DESC],
      options: {pageSize: 6, pageState: ${JSON.stringify(pageState)}}) {
          values {
            year,
            title,
            duration,
            synopsis,
            thumbnail
          }
          pageState
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
