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
    var dataReligion = [];
    var dataArxaio = [];
    var dataTech = [];
    
     // Change the icon of the marker
    var arxeoIcon = L.icon({
        iconUrl: './pic/marker-icon-gold.png',
        iconSize: [28, 38]
    });

    var relegIcon = L.icon({
        iconUrl: './pic/marker-icon-blue.png',
        iconSize: [28, 38]
    });

    var technoIcon = L.icon({
        iconUrl: './pic/marker-icon-red.png',
        iconSize: [28, 38]
    });


var markersArxaiolog = firebase.database().ref('routes');
    markersArxaiolog.orderByChild('tourType').equalTo("Αρχαιολογικοί χώροι").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var arxaioData = childSnapshot.val();
            marker = L.marker([arxaioData.latitude, arxaioData.longitude], { draggable: 'true', icon: arxeoIcon })
                .bindPopup(arxaioData.title + '<br>' + '<a type="button" style="cursor: pointer;" onclick="deletePinsFromDb(\'' + arxaioData + '\', \'' + arxaioData.uid + '\')">Διαγραφή</a>')
                .openPopup();
            arxaioGroup.addLayer(marker);
            dataArxaio.push([arxaioData.latitude, arxaioData.longitude]);
        });
        // var arxaioPolyline = L.polyline(dataArxaio).setStyle({ color: 'green' });
        // arxaioGroup.addLayer(arxaioPolyline);
    });

    var markersReleg = firebase.database().ref('routes');
    markersReleg.orderByChild('tourType').equalTo("Θρησκευτικά μνημεία").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var relegData = childSnapshot.val();
            marker = L.marker([relegData.latitude, relegData.longitude], { draggable: 'true', icon: relegIcon })
                .bindPopup(relegData.title + '<br>' + '<a type="button" style="cursor: pointer;" onclick="deletePinsFromDb(\'' + relegData + '\', \'' + relegData.uid + '\')">Διαγραφή</a>')
                .openPopup();
            relegGroup.addLayer(marker);
            dataReligion.push([relegData.latitude, relegData.longitude]);
        });
        // var relegPolyline = L.polyline(dataReligion).setStyle({ color: 'black' });
        // relegGroup.addLayer(relegPolyline);
    });

    var markersTechno = firebase.database().ref('routes');
    markersTechno.orderByChild('tourType').equalTo("Τεχνολογικά αξιοθέατα").on('value', snapshot => {

        snapshot.forEach(function (childSnapshot) {
            var technoData = childSnapshot.val();
            marker = L.marker([technoData.latitude, technoData.longitude], { draggable: 'true', icon: technoIcon })
                .bindPopup(technoData.title + '<br>' + '<a type="button" style="cursor: pointer;" onclick="deletePinsFromDb(\'' + technoData + '\', \'' + technoData.uid + '\')">Διαγραφή</a>')
                .openPopup();
            technoGroup.addLayer(marker);
            dataTech.push([technoData.latitude, technoData.longitude]);
        });
        // var techPolyline = L.polyline(dataTech).setStyle({ color: 'blue' });
        // technoGroup.addLayer(techPolyline);
    });
});

// Open Chat Popup
function showChat(id) {
    document.getElementById("chat").style.display = "block";
    localStorage.setItem('chatid', id);
    if (id === 'christina') {
        document.getElementById("chatHeader").innerHTML = "Χριστίνα Βασιλειάδη";
    } else if (id === 'tony') {
        document.getElementById("chatHeader").innerHTML = "Tony Chan";
    } else if (id === 'hasan') {
        document.getElementById("chatHeader").innerHTML = "Hasan Abdul";
    }
}

function sendMsg() {
    var chatId = localStorage.getItem('chatid');
    if (document.getElementById("textMsg").value != '') {
      var dateTime = new Date().toLocaleString();
      var mgsToSend = document.getElementById("textMsg").value;
      console.log(mgsToSend);
    }
    
    var msgData = {
      id: chatId,
      date: dateTime,
      message: mgsToSend
    };
    updateChatInDb(chatId, msgData);
  }

// Live Update of chat
function updateChatInDb(chatId, msgData) {
    localStorage.removeItem('chatid');
    var updates = {};
    updates['/chat/' + chatId] = msgData;
    return firebase.database().ref().update(updates);
}

// Close Chat Popup
function closeChat() {
    document.getElementById("chat").style.display = "none";
    localStorage.removeItem('chat');
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


// Open Add Route Form
function showAddRouteForm() {
    document.getElementById("routeForm").style.display = "block";
}

// Add the Route to Db
function addRoute() {
    var tourType = (document.getElementById('type')).value;
    var imageUrl = (document.getElementById('image')).value;

    //saveRouteToDb(name, payment, 10, occupation, languages, specialization);
    closeAddRouteForm();
}

// Close the Popup Add Route Form
function closeAddRouteForm() {
    document.getElementById("routeForm").style.display = "none";
}

// Reminder for chat Popup - NOT WORKING YET
var pmData = [
    {
        "name": "Χριστίνα Βασιλειάδη",
        "message": "Ο πελάτης θα περιμένει στην Καμάρα στις 10:00."
    }
];

