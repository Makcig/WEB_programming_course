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

    fetchCustomers: function(req, res){
      var nimi = req.query.NIMI;  
      var osoite = req.query.OSOITE;
      var asty_avain = req.query.ASTY_AVAIN;
      var sql = 'SELECT * from Asiakas WHERE 1 = 1';
      sql = sql + " AND nimi like '" + nimi + "%'" + " AND osoite like '" + osoite + "%'";

      if(asty_avain != null){
        sql = sql + " AND asty_avain like '" + asty_avain + "%'";
      }

      connection.query(sql, function(error, results, fields){
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

    // Tehtävä 4
    create: function(req, res){
      var nimi = req.body.NIMI;  
      var osoite = req.body.OSOITE;
      var postinro = req.body.POSTINRO;
      var postitmp = req.body.POSTITMP;
      var asty_avain = req.body.ASTY_AVAIN;
      // Tehtävä 9
      if((nimi == "" || nimi == null) || (osoite == "" || osoite == null) || (postinro == "" || postinro == null) || (postitmp == "" || postitmp == null)){
        res.status(400);
        res.json({"status": "Ei tyhjiä kentiä"});
      }
      else{
      var sql = "INSERT INTO asiakas (nimi, osoite, postinro, postitmp, luontipvm, asty_avain)"
      sql += " VALUES ('" + nimi + "', '" + osoite + "', '" + postinro + "', '" + postitmp + "', curDate(), '" + asty_avain + "')";
      connection.query(sql, function(error, results, fields){
        if ( error ){
          console.log("Virhe lisäämisessä asiakasta tauluun: " + error);
          res.status(500);
          res.json({"status:" : "ei toimii"});
        }
        else
        {
          res.status(201);
          console.log("Data = " + JSON.stringify(results));
          res.json("Lisääminen onnistui.");
        }
      });
      }
    },

    update: function(req, res){
      console.log("kek");
    },

    // Tehtävä 6
    delete : function (req, res) {
      var avain = req.params.id;
      connection.query("DELETE FROM asiakas WHERE avain=" + avain, function(error, results, fields){
        if ( error ){
          console.log("Virhe asiakkaan poistossa: " + error);
          res.status(500);
          res.json({"status:" : "ei toimii"});
        }
        else
        {
          console.log("Data = " + JSON.stringify(results));
          res.json("Poisto onnistui.");
        }
      })
    }
}
