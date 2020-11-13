$(document).ready(function () {
    // haetaan data
    fetch = (fromform) => {
        $("#data tr#elements").remove();
        if(document.getElementById("Tyyppi").value == "all"){ //jos valittu "kaikki" haku tapahtu vaan inputien kautta
            $.get({
                url: `http://127.0.0.1:3002/Asiakas?` + $(fromform + ` input`).serialize(),
                success: (result) => {
                    showResultInTable(result);
                },
                error: function (){
                    alert($(fromform ` input`).serialize());
                    alert("1You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' at line 1")
                }
            });
        }else{
            $.get({
                url: `http://127.0.0.1:3002/Asiakas?` + $(fromform).serialize(),
                success: (result) => {
                    showResultInTable(result);
                },
                error: function (){
                    alert("You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' at line 1")
                }
            });
        }
    }

    $('#searchBtn').click(() => {
        fetch(`form#haku`);
    });

    // Haetaan asiakastyypit
    $.get("http://127.0.0.1:3002/Types", function(data){
        var addOpt = '<option value="all">Kaikki</option>';
        var addOptLis = '';
        for(var x of data){
            addOpt += '<option value=' + x.Avain + '>' + x.Selite + '</option>';
            addOptLis += '<option value=' + x.Avain + '>' + x.Selite + '</option>';
        }
        $("#Tyyppi").html(addOpt);
        $("#Tyyppi_lis").html(addOptLis);
    });


    $("#lisaaBtn").click(() => {
        dialog.dialog( "open" );
    });

    // Lisääminen (Tehtävä 4)
    dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 540,
        width: 350,
        modal: true,
        buttons: {
            "Lisää": function () {
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:3002/Asiakas",
                    data: $(`form#lisaus`).serialize(),
                    success: function(data){
                        alert(data);
                        fetch(`form#lisaus`);
                        dialog.dialog( "close" );
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        if(jqXHR.status == 400){
                            alert("Kaikki kentät pitäis olla täytetty")
                        }
                        else{
                            alert("Jotain epäonnistunut");
                        }
                    }
                })
            },
            Cancel: function() {
                dialog.dialog( "close" );
            } 
        }
    });
    // Tehtävä 7
    poista = (avain) => {

        $.ajax({
            url: 'http://127.0.0.1:3002/Asiakas/' + avain,
            type: 'DELETE',
            contentType: 'application/json',
            success: (function(result) {
                fetch(`form#haku`);
                console.log(result);       
            }),
            error:  (function(ajaxContext){
                alert(ajaxContext.responseText);
            })
            
        });
    }
});

// Tuo haun tuloksen table-elementtiin. Jotain kannattaa tehdä, jotta taulukkoon ei tulisi samat tiedot
showResultInTable = (result) => {
    result.forEach(element => {
        let trstr = "<tr id='elements'><td>" + element.NIMI + "</td>";
        trstr += "<td>" + element.OSOITE + "</td>";
        trstr += "<td>" + element.POSTINRO + "</td>";
        trstr += "<td>" + element.POSTITMP + "</td>";
        trstr += "<td>" + element.LUONTIPVM + "</td>";
        // Tälle voisi olla selkokielinen asiakastyyppi:
        trstr += "<td>" + element.ASTY_AVAIN + "</td>";
        // Tehtävä 6
        trstr += "<td><input type='submit' value='Poista' onclick='poista(" + element.AVAIN + ")'></td>";
        trstr += "</tr>";
        $('#data tbody').append(trstr);
    });
}