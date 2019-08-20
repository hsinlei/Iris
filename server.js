let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let PORT = 8002;

let pool = new pg.Pool({
	port: 5432,
	max: 10,
	host: 'localhost',
	database: 'postgres'
});

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(function(request, response, next) {
	response.header("Access-Control-Allow-Origin", "*"); // TODO: update to match the domain you will make the request from
  	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.post('/api/getsavedcount', function(request, response) {
	var post_id = parseInt(request.body.post_id, 10);
	console.log('request post_id = ' + post_id);
	pool.connect((err, db, done) => {
		if (err) {
			return console.log(err);
		} else {
			db.query('SELECT COUNT(*) FROM saves WHERE post_id = ' + post_id, (err, table) => {
				if (err) {
					return console.log(err);
				} else {
					console.log('query succeeded');
					console.log(table);
					response.status(200).send({'saved': table.rows[0].count});
				}
			});
		}
	});
});

app.post('/api/save', function(request, response) {
	var post_id = request.body.post_id;
	var user_id = request.body.user_id;
	console.log('request post_id = ' + post_id + ', user_id' + user_id);
	pool.connect((err, db, done) => {
		if (err) {
			return console.log(err);
		} else {
			db.query('INSERT INTO saves (post_id, user_id) VALUES (' + post_id + ', ' + user_id + ')', (err, table) => {
				if (err) {
					return console.log(err);
				} else {
					console.log('query succeeded');
					console.log(table);
					response.status(200).send({message: 'succeeded'});
				}
			});
		}
	});
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));

// Examples 
const getTableData = (req, res, db) => {
  db.select('*').from('testtable1')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.body
  const added = new Date()
  db('testtable1').insert({first, last, email, phone, location, hobby, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body
  db('testtable1').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('testtable1').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}