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

    // bindataan click-event
    $('#searchBtn').click(() => {
        fetch(`form#haku`);
    });

    // Haetaan asiakastyypit
    $.get("http://127.0.0.1:3002/Types", function(data){
        var addOpt = '<option value="all">Kaikki</option>';
        for(var x of data){
            addOpt += '<option value=' + x.Avain + '>' + x.Selite + '</option>';
        }
        $("#Tyyppi").html(addOpt);
    });
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
        trstr += "</tr>";
        $('#data tbody').append(trstr);
    });
}