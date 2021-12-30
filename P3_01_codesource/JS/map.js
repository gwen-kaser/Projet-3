class Map {
    constructor() {
        // afficher la map - ville de Nancy - API mapbox 
        this.mymap = L.map("map").setView([48.6937223, 6.1834097], 13);
        L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2thc2VyIiwiYSI6ImNrZm54bDdpczBocHUycW1xNnI3Z2Jmbm8ifQ.Ijj7a5xaYQhG1oxBjGFMDQ", {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: "pk.eyJ1IjoiZ2thc2VyIiwiYSI6ImNrZm54bDdpczBocHUycW1xNnI3Z2Jmbm8ifQ.Ijj7a5xaYQhG1oxBjGFMDQ"
    }).addTo(this.mymap);
        // appel fonction 
        this.ajaxGet();   
    }
    
    ajaxGet() {
        // récupérer les données des stations de l'API JCDécaux
        const url = "https://api.jcdecaux.com/vls/v1/stations?contract=Nancy&apiKey=83ac04a0238601d9d285eb440f7d8dafdc97f42f";
        // méthode Ajax qui permet de récupérer la liste des stations (JSON)
        const request = new XMLHttpRequest();
        request.onload =  () => {
            const response = JSON.parse(request.responseText);
            this.showMarkers(response);
        };
        request.onerror = function (response) {
        };
        request.open("GET", url, true);
        request.send(null);
    }   
    
   showMarkers(stations) {
        // boucle pour afficher les stations sur la map
        for (let i = 0; i < stations.length; i++) {
            // placer les marqueurs sur les stations 
            const marker = L.marker([stations[i].position.lat,stations[i].position.lng]).addTo(this.mymap);
            
            // évènement click marqueur récupérer informations station 
            marker.on("click", () => {
                const address = stations[i].address;
                const statusStation = stations[i].status;
                const bikeStands = stations[i].bike_stands;
                let availableBikes = stations[i].available_bikes; 
                // affichager les informations de la station sélectionnée
                document.getElementById("adress").innerText = address;
                document.getElementById("statusStation").innerHTML = statusStation;
                document.getElementById("bikeStands").innerHTML = bikeStands;
                document.getElementById("availableBikes").innerHTML = availableBikes;
                // afficher bouton "réserver" 
                document.getElementById("booking").style.display = "block";
                // Appel fonction
                this.bookingAutorisation(availableBikes,statusStation);
            });
        }
    }

    bookingAutorisation(bikes,status) {
        // cacher le formulaire quand la station est vide/fermée
        let bookingForm = document.getElementById("booking-form");
        if (bikes > 0 && status == "OPEN") {
            bookingForm.style.display = "block"; }
        else {
            bookingForm.style.display = "none";
        }
    }
 }
