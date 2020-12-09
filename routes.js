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


// Open Chat Popup
function showChat() {
    document.getElementById("chat").style.display = "block";
}

// Close Chat Popup
function closeChat() {
    document.getElementById("chat").style.display = "none";
}


// Save a new routes to DB
function saveRouteToDb(title, tourType, imageUrl) {
    var routeId = firebase.database().ref().child('routes').push().key;
    updateRoute(routeId, title, tourType, imageUrl);
}

// Update the Database View
function updateRoute(routeId, title, tourType, imageUrl) {
    var request = {
        uid: routeId,
        title: title,
        tourType: tourType,
        imageUrl: imageUrl
    };
    updateDb(routetId, route);
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


// Reminder for chat Popup - NOT WORKING YET
var pmData = [
    {
        "name": "Χριστίνα Βασιλειάδη",
        "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
    }
];


var archeologicalSitesData = [
    {
        "lat": "40.63241",
        "long": "22.95171",
        "label": "Καμάρα"
    },
    {
        "lat": "40.62679",
        "long": "22.94845",
        "label": "Λευκός Πύργος"
    }
];

var byzantineMonumentsData = [
    {
        "lat": "40.62395",
        "long": "22.95505",
        "label": "Βυζαντινό Μουσείο"
    },
    {
        "lat": "40.48818",
        "long": "22.31589",
        "label": "Βεργίνα"
    }
];

var technologicalSitesData = [
    {
        "lat": "40.56725",
        "long": "22.98239",
        "label": "Πλανητάριο"
    },
    {
        "lat": "40.62807",
        "long": "22.95476",
        "label": "ΔΕΘ"
    }
];

//         var pmData = [
//             {
//                 "name": "Χριστίνα Βασιλειάδη",
//                 "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
//             }
//         ];

//         $(document).ready(function () {
//             for (var i = 0; i < archeologicalSitesData.length; i++) {
//                 L.marker([archeologicalSitesData[i].lat, archeologicalSitesData[i].long]).addTo(map);
//             }
//         });

