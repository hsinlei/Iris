let express = require("express");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let pg = require("pg");
// Heroku must listen on a specific port
let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 8002;
}
let Helper = require("./Helper").Helper;
let moment = require("moment");
// var path = require("path");
// var UserWithDb = require(path.resolve(__dirname, "./User.js"));

let app = express();
let pool = new pg.Pool({
  port: 5432,
  max: 10,
  host: "localhost",
  database: "postgres"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*"); // TODO: update to match the domain you will make the request from
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// create a user sign up
app.post("/api/createuser", function(request, response) {
  console.log("creatuser requests = " + request.body.name);
  // check if the form data is valid
  if (!request.body.email || !request.body.password) {
    return response.status(401).send({ message: "Some values are missing" });
  }
  if (!Helper.isValidEmail(request.body.email)) {
    return response
      .status(402)
      .send({ message: "Please enter a valid email address" });
  }

  // for security purposes
  const hashPassword = Helper.hashPassword(request.body.password);
  const ts = new Date().getTime();
  const createQuery = `INSERT INTO
      users (name, email, password, created_date, modified_date)
      VALUES ('${request.body.name}','${request.body.email}', '${hashPassword}', ${ts}, ${ts})
      returning *`;

  console.log(createQuery);
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return console.log(err);
    } else {
      try {
        // console.log("hi");
        db.query(createQuery, (err, table) => {
          if (err) {
            return console.log(err);
          } else {
            return response.status(201).send({ id: table.rows[0].id });
          }
        });
      } catch (error) {
        if (error.routine === "_bt_check_unique") {
          return response
            .status(403)
            .send({ message: "User with that EMAIL already exist" });
        }
        console.log(error);
        return response.status(404).send(error);
      }
    }
  });
});

app.post("/api/getsavedcount", function(request, response) {
  // console.log("request post_id = " + request.body.post_id);
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return console.log(err);
    } else {
      db.query(
        "SELECT COUNT(*) FROM saves WHERE post_id = " + request.body.post_id,
        (err, table) => {
          if (err) {
            return console.log(err);
          } else {
            // console.log("query succeeded");
            // console.log(table);
            response.status(200).send({ saved: table.rows[0].count });
          }
        }
      );
    }
  });
});

// user login
app.post("/api/loginuser", function(request, response) {
  console.log("loginuser requests = " + request.body.email);
  // check if the form data is valid
  if (!request.body.email || !request.body.password) {
    return response.status(401).send({ message: "Some values are missing" });
  }
  if (!Helper.isValidEmail(request.body.email)) {
    return response
      .status(402)
      .send({ message: "Please enter a valid email address" });
  }

  const createQuery = `SELECT * FROM users WHERE email = '${request.body.email}'`;

  pool.connect((err, db, done) => {
    done();
    if (err) {
      return console.log(err);
    } else {
      try {
        // console.log("hi");
        db.query(createQuery, (err, table) => {
          if (err) {
            return console.log(err);
          } else {
            first_result = table.rows[0];
            if (!first_result) {
              return response
                .status(400)
                .send({ message: "The credentials you provided is incorrect" });
            }

            console.log("this is user id (in rows)" + first_result.id);

            if (
              !Helper.comparePassword(
                first_result.password,
                request.body.password
              )
            ) {
              return response
                .status(400)
                .send({ message: "The credentials you provided is incorrect" });
            }
            response.status(201).send({ user_id: first_result.id });
            // TODO: lead to the login success page
          }
        });
      } catch (error) {
        console.log(error);
        return response.status(404).send(error);
      }
    }
  });
});

app.post("/api/checksaved", function(request, response) {
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return console.log(err);
    } else {
      db.query(
        "SELECT COUNT(*) FROM saves WHERE post_id = " +
          request.body.post_id +
          " AND user_id = " +
          request.body.user_id,
        (err, table) => {
          if (err) {
            return console.log(err);
          } else {
            // console.log("query succeeded");
            // console.log(table);
            response.status(200).send({ count: table.rows[0].count });
          }
        }
      );
    }
  });
});

app.post("/api/save", function(request, response) {
  var post_id = request.body.post_id;
  var user_id = request.body.user_id;
  console.log("inserting post_id = " + post_id + ", user_id" + user_id);
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return console.log(err);
    } else {
      db.query(
        "INSERT INTO saves (post_id, user_id) VALUES (" +
          post_id +
          ", " +
          user_id +
          ")",
        (err, table) => {
          if (err) {
            return console.log(err);
          } else {
            console.log("insert succeeded");
            console.log(table);
            response.status(200).send({ message: "succeeded" });
          }
        }
      );
    }
  });
});

app.post("/api/unsave", function(request, response) {
  var post_id = request.body.post_id;
  var user_id = request.body.user_id;
  console.log("deleting post_id = " + post_id + ", user_id" + user_id);
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return console.log(err);
    } else {
      db.query(
        "DELETE FROM saves WHERE post_id = " +
          post_id +
          " AND user_id = " +
          user_id,
        (err, table) => {
          if (err) {
            return console.log(err);
          } else {
            console.log("delete succeeded");
            console.log(table);
            response.status(200).send({ message: "succeeded" });
          }
        }
      );
    }
  });
});

app.listen(PORT, () => console.log("Listening on port " + PORT));

// Examples
const getTableData = (req, res, db) => {
  db.select("*")
    .from("testtable1")
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const postTableData = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.body;
  const added = new Date();
  db("testtable1")
    .insert({ first, last, email, phone, location, hobby, added })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const putTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body;
  db("testtable1")
    .where({ id })
    .update({ first, last, email, phone, location, hobby })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.body;
  db("testtable1")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
};
