const db = require('./models');

const fetch = require('node-fetch');

const { Pool } = require('pg');

const queryController = {
  executeQueryUntracked: (req, res, next) => {
    // event.sender.send('async-started');

    // destructure object from frontend
    const { queryString } = req.body;
    // run query on db
    db.query(queryString)
      .then(() => {
        (async function getListAsync() {
          let listObj = await db.getLists();
          // event.sender.send('db-lists', listObj);
          // event.sender.send('async-complete');
        })();
      })
      .then(next())
      .catch((error: string) => {
        // event.sender.send('query-error', 'Error executing query.');
      });
  },

  executeQueryTracked: async (req, res, next) => {
    // extract query string from client request
    const { queryString, queryLabel } = req.body.query;
    console.log('execute query cookies', req.cookies);
    console.log('this is the req.body', req.body);
    // declare a user object to hold connection string
    const users = {};

    const options = {
      method: 'GET',
      headers: {
        Authorization:
          'Basic Ojg4MDVmN2U2LTBiZWUtNDcwNC04OWRlLTU5YmM2ZTJlNWEyYw==',
      },
    };
    const response = await fetch(
      `https://customer.elephantsql.com/api/instances/${req.cookies.session_id}`,
      options
    );
    const data = await response.json();
    const { url } = data;
    users[req.cookies.session_id] = new Pool({ connectionString: url });

    // match the connection pool based on cookies
    const pool = users[req.cookies['session_id']];

    const rows = await pool.query(queryString);
    res.locals.queryData = rows.rows;
    console.log(
      'this is the res.locals.queryData w/ rows',
      res.locals.queryData.rows
    );
    // Run EXPLAIN (FORMAT JSON, ANALYZE)
    if (!queryString.match(/create/i)) {
      const queryStats = await pool.query(
        'EXPLAIN (FORMAT JSON, ANALYZE) ' + queryString
      );
      res.locals.queryStats = queryStats.rows;
      res.locals.queryLabel = queryLabel;
      console.log(
        'this is inside making a query if db exists',
        res.locals.queryStats
      );
    }

    // send back to client
    return next();
  },
  generateDummyData: (req, res, next) => {
    next();
  },
};

export default queryController;
