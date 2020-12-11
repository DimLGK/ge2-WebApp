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

$(document).ready(function () {
    var arxRoutePoints, texRoutePoints, relRoutePoints = [];
    
    var markersArxaiolog = firebase.database().ref('routes');
    markersArxaiolog.orderByChild('tourType').equalTo("Αρχαιολογικοί χώροι").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var arxaioData = childSnapshot.val();
            marker = L.marker([arxaioData.latitude, arxaioData.longitude], { draggable: 'true' }).bindPopup(arxaioData.title).openPopup();
            arxaioGroup.addLayer(marker);
        });
    });

    var markersReleg = firebase.database().ref('routes');
    markersReleg.orderByChild('tourType').equalTo("Θρησκευτικά μνημεία").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var relegData = childSnapshot.val();
            marker = L.marker([relegData.latitude, relegData.longitude], { draggable: 'true' }).bindPopup(relegData.title).openPopup();
            relegGroup.addLayer(marker);
        });
    });

    var markersTechno = firebase.database().ref('routes');
    markersTechno.orderByChild('tourType').equalTo("Τεχνολογικά αξιοθέατα").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var technoData = childSnapshot.val();
            marker = L.marker([technoData.latitude, technoData.longitude], { draggable: 'true' }).bindPopup(technoData.title).openPopup();
            technoGroup.addLayer(marker);
        });
    });
});

// Open Chat Popup
function showChat() {
    document.getElementById("chat").style.display = "block";
}

// Close Chat Popup
function closeChat() {
    document.getElementById("chat").style.display = "none";
}

// Save a new routes to DB
function saveRouteToDb(latitude, longitude, isSelected, title, description, tourType, imageUrl) {
    var routeId = firebase.database().ref().child('routes').push().key;
    updateRoute(routeId, latitude, longitude, isSelected, title, description, tourType, imageUrl);
}

// Update the Database View
function updateRoute(routeId, latitude, longitude, isSelected, title, description, tourType, imageUrl) {
    var route = {
        uid: routeId,
        latitude: latitude,
        longitude: longitude,
        isSelected: isSelected,
        title: title,
        description: description,
        tourType: tourType,
        imageUrl: imageUrl
    };
    updateDb(routeId, route);
}

// Delete a routes from DB and update
function deleteRouteFromDb(routeId) {
    updateDb(routeId, null);
}

// Live Update of Database
function updateDb(uid, route) {
    var updates = {};
    updates['/routes/' + uid] = route;
    return firebase.database().ref().update(updates);
}


function deleteRoute1() {
    document.getElementById("tour1").style.display = "none";
}

function deleteRoute2() {
    document.getElementById("tour2").style.display = "none";
}

function deleteRoute3() {
    document.getElementById("tour3").style.display = "none";
}


// Reminder for chat Popup - NOT WORKING YET
var pmData = [
    {
        "name": "Χριστίνα Βασιλειάδη",
        "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
    }
];

