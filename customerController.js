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
    // Tehtävä 2 ja 3
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
        res.json({"status": "Ei onnistunut", "error" : "Kaikki kentät pitäisi olla täytetty"});
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
    // Tehtävä 10
    update: function(req, res){
      var avain = req.params.id;
      var sql = "UPDATE asiakas SET nimi='" + req.body.NIMI + "', osoite='" + req.body.OSOITE + "', postinro='" + req.body.POSTINRO + "', postitmp='" + req.body.POSTITMP + "', asty_avain='" + req.body.ASTY_AVAIN + "' WHERE avain=" + avain;
      connection.query(sql, function(error, results, fields){
        if(error){
          console.log("Virhe asiakkaan muokkauksessa: " + error);
          res.status(500);
          res.json({"status:" : "ei toimii"});
        }
        else{
          res.json("Muokkaus onnistui");
          res.status(202);
        }
      });
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
    },
    // Muokkausta varten
    getCustomerById : function(req, res){
      var avain = req.params.id;
      connection.query("SELECT * FROM asiakas WHERE avain=" + avain, function(error, results, fields){
        if ( error ){
          console.log("Virhe asiakkaan otossa: " + error);
          res.status(500);
          res.json({"status:" : "ei toimii"});
        }
        else
        {
          console.log("Data = " + JSON.stringify(results));
          res.json(results);
        }
      })
    }
}
