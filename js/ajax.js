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
        $("#Tyyppi_edit").html(addOptLis);
    });


    $("#lisaaBtn").click(() => {
        lisaus.dialog( "open" );
    });

    // Lisääminen (Tehtävä 4)
    lisaus = $( "#dialog-form" ).dialog({
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
                        lisaus.dialog( "close" );
                    },
                    error: function(data){
                        if(data.status == 400){
                            alert(data.responseText);
                        }
                        else{
                            alert("Jotain epäonnistunut");
                        }
                    }
                })
            },
            Cancel: function() {
                lisaus.dialog( "close" );
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
                alert("Poisto onnistui.");
                fetch(`form#haku`);
                console.log(result);       
            }),
            error:  (function(ajaxContext){
                alert(ajaxContext.responseText);
            })
            
        });
    },

    // Тehtävä 10
    edit = (avain) =>{
        $.ajax({
            url: `http://127.0.0.1:3002/Asiakas/` + avain,
            type: 'GET',
            //contentType: 'application/json',
            success: (result) => {
                result.forEach(element => {
                    $("#avain_edit").text(element.AVAIN);
                    $("#nimi_edit").val(element.NIMI);
                    $("#osoite_edit").val(element.OSOITE);
                    $("#postinro_edit").val(element.POSTINRO);
                    $("#postitmp_edit").val(element.POSTITMP);
                    $("#Tyyppi_edit").val(element.ASTY_AVAIN);
                    return;
                })
            },
            error: (function(ajaxContext){
                console.log("Virhe haettaessa")
            })
        });
        editwindow.data("id", avain).dialog( "open" );
    },
    editwindow = $( "#dialog-edit" ).dialog({
        autoOpen: false,
        height: 540,
        width: 350,
        modal: true,
        buttons: {
            "Muokata": function () {
                $.ajax({
                    type: "PUT",
                    url: "http://127.0.0.1:3002/Asiakas/" + $(this).data("id"),
                    data: $(`form#edit-form`).serialize(),
                    success: function(data){
                        alert(data);
                        editwindow.dialog( "close" );
                        fetch(`form#edit-form`);
                    },
                    error: function(data){
                        alert("Jotain epäonnistunut");
                    }
                })
            },
            Cancel: function() {
                editwindow.dialog( "close" );
            } 
        }
    })
});

showResultInTable = (result) => {
    result.forEach(element => {
        let trstr = "<tr id='elements'><td scope='row'>" + element.NIMI + "</td>";
        trstr += "<td>" + element.OSOITE + "</td>";
        trstr += "<td>" + element.POSTINRO + "</td>";
        trstr += "<td>" + element.POSTITMP + "</td>";
        trstr += "<td>" + element.LUONTIPVM + "</td>";
        trstr += "<td>" + element.ASTY_AVAIN + "</td>";
        // Tehtävä 6
        trstr += "<td><input type='submit' class='btn btn-primary' value='Poista' onclick='poista(" + element.AVAIN + ")'></td>";
        // Tehtävä 10
        trstr += "<td><input type='button' class='btn btn-primary' value='Edit' onclick='edit(" + element.AVAIN + ")'></td>";
        trstr += "</tr>";
        $('#data tbody').append(trstr);
        //$.get("http://127.0.0.1:3002/Types", function(data){tyyppi= String(Object.values(data)[element.ASTY_AVAIN-1].Selite)});
    });
}