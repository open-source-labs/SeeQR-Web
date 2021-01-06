const fetch = require('node-fetch');
const { Pool } = require('pg');
const users = {};
const url = 'https://customer.elephantsql.com/api/instances';
let dbnum = 0;

const options = str => ({
  method: str,
  headers: {
    Authorization:
      'Basic Ojg4MDVmN2U2LTBiZWUtNDcwNC04OWRlLTU5YmM2ZTJlNWEyYw==',
  },
})

const deleteDB = async id => await fetch(`${url}/${id}`, options('DELETE'));

const dbController = {
  makeDB: async (req, res, next) => {
    if (!('session_id' in req.cookies)) {
      const response = await fetch(
        `${url}?name=devdatabase${++dbnum}9&plan=turtle&region=amazon-web-services::us-east-1`,
        options('POST')
      );
      const data = await response.json();
      const { id, connectStr } = data;
      const expiry = 1800000; //30 minutes
      users[id] = new Pool({ connectionString: connectStr });
      res.cookie('session_id', id, { maxAge: expiry });

      setTimeout(() => deleteDB(id), expiry); 
    } else {
      const response = await fetch(
        `${url}/${req.cookies.session_id}`,
        options('GET')
      );
      const data = await response.json();
      const { connectStr } = data;
      users[req.cookies.session_id] = new Pool({ connectionString: connectStr });
    }
    next();
  },

};

export default dbController;
