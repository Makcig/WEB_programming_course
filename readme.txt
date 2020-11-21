Tehtävät 1
Eli tiedostot jossa on kotitehtävät:
js/ajax.js          (Eli tiedosto ajax.js pitäisi olla js/ kansiossa)
index.html
customerController.js
server.js

Muista ennen tarkistusta käynistä palvelin.

Käynistä index.html ja paina "HAE" näppäintä, jolla serveri palauttaa kaikkien asiakkaiden nimiä.
Asiakkaita voi myös hakea hakuehdoilla nimi, osoite ja/tai asiakastyyppi. Tyypien haku tapahtuu automaatisesti
palvelimesta sivun käynistyksessä.


Tehtävät 2
Tiedostot ovat samat kun edellisessä tehtävässä. Lisäksi on kuvat T5 ja T8, jotka vastaavat tehtävästä 5 ja tehtävästä 8.

Koodin sisällä kommenteissä näkyy missä kohdassa ja mikä tehtävä alkaa.

Tiedostoa server.js ei ole koskettu


Tehtävät 3
Asiakkaan muokkaus lisätty.
server.js - lisätty /asiakas/:id get metodi, jolla voi ottaa asikas tiedot asiakas-avaimella
customerController.js - lisätty metodi getCustomerById() jolla haetaan tiedot, ja update() jolla tapahtuu itse muokkaus
index.html - lisätty uusi muokkaus-formi
ajax.js - lisätty "muokka" painike, sekä id:llä tiedon haku ja muokkaus metodit.
readme.txt - päivitetty.