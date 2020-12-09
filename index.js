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

        // var markersRef = firebase.database().ref('markers'); 
        // markersRef.on('value', snapshot => {
        //   snapshot.forEach(function(childSnapshot) {
        //     var childData = childSnapshot.val();

        //   });     
        // });

        // Load the map with Esri Leaflet
        var map = L.map('map').setView([40.63, 22.94], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);





