// set up ======================================================================

var express     = require('express');
var app         = express(); 						// create our app w/ express
var port        = process.env.PORT || 8080; 				// set the port
var bodyParser  = require('body-parser');
var cors        = require('cors');
var _           = require('lodash');
var Q           = require("q");
var pg          = require('pg');
                  require('moment/locale/es');

// configuration ===============================================================

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(cors());
app.options('*', cors()); // include before other routes

//var DB_CONN_STRING = "postgres://postgres@localhost:5432/repo";
//var DB_CONN_STRING = "postgres://postgres@200.75.18.197:5432/repo";
var DB_CONN_STRING = "postgres://postgres@172.34.10.50:5432/repo";
console.log("DB_CONN_STRING", DB_CONN_STRING);
var config = {
    user: 'postgres', //env var: PGUSER
    database: 'repo', //env var: PGDATABASE
    password: '1q2w3e4r', //env var: PGPASSWORD
    host: '172.34.10.50', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

// routes ======================================================================

app.get('/api/any', function (req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pool.connect(function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        if(req.query.values){
            req.query.values = JSON.parse(req.query.values);
        }

        var sql = "SELECT * FROM " + req.query.table;
        if(req.query.values){
            sql += " WHERE ";
            _.forOwn(req.query.values, function(value, key){
                sql += key + " = " + getSqlValue(value) + " AND ";
            });
            sql = sql.substring(0, sql.length-5);
        }

        console.log("------------------ select = " + sql);

        // SQL Query > Select Data
        var query = client.query(sql);

        // Stream results back one row at a time
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});

app.put('/api/any', function (req, res) {

    // Get a Postgres client from the connection pool
    pool.connect(function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }

        var sqlp1 = "";
        var sqlp2 = "";

        _.forOwn(req.body.values, function(value, key){
            if(value != undefined){
                sqlp1 += key + ", ";
                sqlp2 += getSqlValue(value) + ", ";
            }
        });
        sqlp1 = sqlp1.substring(0, sqlp1.length-2);
        sqlp2 = sqlp2.substring(0, sqlp2.length-2);

        var sql = "INSERT INTO " + req.body.table + "(" + sqlp1 + ") VALUES (" + sqlp2 + ") RETURNING id";
        console.log("------------------ insert = " + sql);

        // SQL Query > Select Data
        var query = client.query(sql);

        // Stream results back one row at a time
        var insertedId = undefined;
        query.on('row', function (row) {
            insertedId = row.id;
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            done();
            return res.json({id:insertedId});
        });
    });
});

function getSqlValue(value){
    if(typeof value == 'string'){
        return "\'" + value + "\'";
    }else{
        return value;
    }
}

// application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================

app.listen(port);
console.log("App listening on port " + port);
