'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'user',
  password : '',
  database : 'asiakas'
});

module.exports = 
{
    fetchTypes: function (req, res) {  
      connection.query('SELECT Avain, Lyhenne, Selite FROM Asiakastyyppi', function(error, results, fields){
        if ( error ){
          console.log("Virhe haettaessa data asiakas-taulusta: " + error);
          res.status(500);
          res.json({"status:" : "ei toimii"});
        }
        else
        {
          console.log("Data = " + JSON.stringify(results));
          res.json(results);
        }
    });

    },

    fetchAll: function(req, res){
      //connection.query...
        console.log("Body = " + JSON.stringify(req.body));
        console.log("Params = " + JSON.stringify(req.query));
        console.log(req.query.nimi);

      res.send("Kutsuttiin fetchAll");
    },

    create: function(req, res){
      //connection.query...
      console.log("Data = " + JSON.stringify(req.body));
      console.log(req.body.nimi);
      res.send("Kutsuttiin create");
    },

    update: function(req, res){
      console.log("kek");
    },

    delete : function (req, res) {
      console.log("Body = " + JSON.stringify(req.body));
      console.log("Params = " + JSON.stringify(req.params));
        res.send("Kutsuttiin delete");
    }
}
