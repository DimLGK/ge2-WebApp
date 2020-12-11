var scriptJQuery = document.createElement('script');
var scriptFirebaseApp = document.createElement('script');
var scriptFirebaseDb = document.createElement('script');
var scriptLeaflet = document.createElement('script');
var scriptEsriLeaflet = document.createElement('script');
scriptJQuery.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
scriptFirebaseApp.src = 'https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js';
scriptFirebaseDb.src = 'https://www.gstatic.com/firebasejs/8.1.1/firebase-database.js';
scriptLeaflet.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
scriptEsriLeaflet.src = 'https://unpkg.com/esri-leaflet@2.5.0/dist/esri-leaflet.js';
scriptJQuery.type = 'text/javascript';
scriptFirebaseApp.type = 'text/javascript';
scriptFirebaseDb.type = 'text/javascript';
scriptLeaflet.type = 'text/javascript';
scriptEsriLeaflet.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(scriptJQuery);    
document.getElementsByTagName('head')[0].appendChild(scriptFirebaseApp);  
document.getElementsByTagName('head')[0].appendChild(scriptFirebaseDb);  
document.getElementsByTagName('head')[0].appendChild(scriptLeaflet);  
document.getElementsByTagName('head')[0].appendChild(scriptEsriLeaflet);  

// Data for map
    var archeologicalSitesData = [
        {
            "lat": "40.62731322860056",
            "long": "22.9508688610709",
            "guide": "Tony Chan"
        },
        {
            "lat": "40.58272482165455",
            "long": "22.963157448468245",
            "guide": "Hasan Adbul"
        },
        {

            "lat": "40.6421290045795",
            "long": "22.95440936389948",
            "guide": "Χριστινα Βασιλειάδη"

        }
    ];

    var guideIcon = L.icon({
        iconUrl: './pic/marker_car.png',
        iconSize: [38, 38], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });


// Load the map with Esri Leaflet
    var map = L.map('$("#map")').setView([40.63, 22.94], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    for (var data of archeologicalSitesData) {
        L.marker([data.lat, data.long], { icon: guideIcon }).addTo(map)
            .bindPopup(data.guide)
            .openPopup();
    }
    
    // Chat window functions
    function openForm() {
        document.getElementById("christina").style.display = "block";
    }

    function closeForm() {
        document.getElementById("christina").style.display = "none";
    }

    var input = document.getElementById('christina');
    document.getElementById('submit').onclick = function () {
        pmData.push(input.value);
        screen.innerHTML = input.value;
    };

// Configuration Firebase
var firebaseConfig = {
    apiKey: "AIzaSyD_xg06CLNiORbmfVO-6vURoADclO1g2eo",
    authDomain: "tourexploration.firebaseapp.com",
    databaseURL: "https://tourexploration.firebaseio.com",
    projectId: "tourexploration",
    storageBucket: "tourexploration.appspot.com",
    messagingSenderId: "115899410318",
    appId: "1:115899410318:web:49b5df20824212d6d6a6df",
    measurementId: "G-EMZ6NWJ72Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Api for google maps

// Initialize and add the map
//function initMap() {
//    const thessaloniki = { lat: 40.627470, lng: 22.948031 };
//    const map = new google.maps.Map(document.getElementById("map"), {
//        zoom: 12,
//        center: thessaloniki,
//    });
    // The marker, positioned at Uluru
//    const marker = new google.maps.Marker({
//        position: thessaloniki,
//        map: map,
//    });
// }

//var pmData = [
//   {
//        "name": "Χριστίνα Βασιλειάδη",
//        "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
//    }
//];



